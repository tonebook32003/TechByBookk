'use client'

import {
    Root as DialogRoot,
    Portal as DialogPortal,
    Overlay as DialogOverlay,
    Content as DialogContent,
    Title as DialogTitle,
    Description as DialogDescription,
    Close as DialogClose,
} from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSignIn, useSignUp, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')

    const { signIn, setActive } = useSignIn()
    const { signUp, setActive: setActiveSignUp } = useSignUp()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    // Check if user is signed in after OAuth redirect
    useEffect(() => {
        if (isSignedIn) {
            onOpenChange(false)
            // Force a router refresh to update the UI
            router.refresh()
        }
    }, [isSignedIn, onOpenChange, router])

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setNeedsVerification(false)
            setVerificationCode('')
            setError('')
            setEmail('')
            setPassword('')
            setName('')
            setConfirmPassword('')
        }
    }, [open])

    const handleGoogleLogin = async () => {
        try {
            setLoading(true)
            setError('')

            // Clerk handles OAuth redirects automatically
            // After redirect, Clerk will automatically set the session
            if (isSignUp && signUp) {
                await signUp.authenticateWithRedirect({
                    strategy: 'oauth_google',
                    redirectUrl: `${window.location.origin}?oauth=signup`,
                    redirectUrlComplete: `${window.location.origin}?oauth=complete`,
                })
            } else if (signIn) {
                await signIn.authenticateWithRedirect({
                    strategy: 'oauth_google',
                    redirectUrl: `${window.location.origin}?oauth=signin`,
                    redirectUrlComplete: `${window.location.origin}?oauth=complete`,
                })
            }
            // Close modal before redirecting
            // Note: This will redirect, so the component will unmount
            onOpenChange(false)
        } catch (err: any) {
            console.error('Error signing in with Google:', err)
            setError(err.errors?.[0]?.message || 'Failed to sign in with Google')
            setLoading(false)
        }
    }

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!signUp) {
                setError('Sign up not available')
                setLoading(false)
                return
            }

            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            })

            if (result.status === 'complete') {
                await setActiveSignUp({ session: result.createdSessionId })
                setNeedsVerification(false)
                setVerificationCode('')
                onOpenChange(false)
                router.refresh()
            } else {
                setError('Verification failed. Please check your code and try again.')
            }
        } catch (err: any) {
            console.error('Verification error:', err)
            setError(err.errors?.[0]?.message || 'Verification failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        try {
            setError('')
            if (signUp) {
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
                setError('Verification code resent! Please check your email.')
            }
        } catch (err: any) {
            console.error('Resend code error:', err)
            setError(err.errors?.[0]?.message || 'Failed to resend code')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    setError('Passwords do not match')
                    setLoading(false)
                    return
                }

                if (!signUp) {
                    setError('Sign up not available')
                    setLoading(false)
                    return
                }

                const result = await signUp.create({
                    emailAddress: email,
                    password: password,
                    firstName: name.split(' ')[0] || name,
                    lastName: name.split(' ').slice(1).join(' ') || '',
                })

                // Send email verification code
                if (result.status === 'complete') {
                    await setActiveSignUp({ session: result.createdSessionId })
                    onOpenChange(false)
                    router.refresh()
                } else {
                    // Need to verify email
                    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
                    setNeedsVerification(true)
                    setError('')
                }
            } else {
                if (!signIn) {
                    setError('Sign in not available')
                    setLoading(false)
                    return
                }

                const result = await signIn.create({
                    identifier: email,
                    password: password,
                })

                if (result.status === 'complete') {
                    await setActive({ session: result.createdSessionId })
                    onOpenChange(false)
                    // Reset form
                    setEmail('')
                    setPassword('')
                } else {
                    setError('Sign in incomplete. Please try again.')
                }
            }
        } catch (err: any) {
            console.error('Authentication error:', err)
            setError(err.errors?.[0]?.message || 'Authentication failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <DialogRoot open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay className="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <DialogContent className="modal-content fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg rounded-lg">
                    <DialogTitle className="text-2xl font-bold text-foreground">
                        {needsVerification ? 'Verify Your Email' : isSignUp ? 'Sign Up' : 'Login'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        {needsVerification
                            ? `We sent a verification code to ${email}. Please enter it below.`
                            : isSignUp
                                ? 'Create a new account to get started'
                                : 'Enter your credentials to access your account'}
                    </DialogDescription>

                    {error && (
                        <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {needsVerification ? (
                        <form onSubmit={handleVerification} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="verificationCode" className="text-sm font-medium text-foreground">
                                    Verification Code
                                </label>
                                <input
                                    id="verificationCode"
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    required
                                    maxLength={6}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition text-center text-2xl tracking-widest"
                                />
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter the 6-digit code sent to your email
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || verificationCode.length !== 6}
                                className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Verify Email'}
                            </button>

                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={loading}
                                className="w-full px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition font-medium text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Resend Code
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setNeedsVerification(false)
                                    setVerificationCode('')
                                    setError('')
                                }}
                                className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
                            >
                                Back to Sign Up
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        required
                                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition"
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition"
                                />
                            </div>

                            {isSignUp && (
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(!isSignUp)
                                    setNeedsVerification(false)
                                    setVerificationCode('')
                                    setError('')
                                }}
                                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
                            >
                                {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign up'}
                            </button>
                        </form>
                    )}

                    {/* <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition font-medium flex items-center justify-center gap-2 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Login with Google
                    </button> */}

                    <DialogClose asChild>
                        <button
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    )
}

