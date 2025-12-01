'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { LoginModal } from './login-modal'
import { useUser, useClerk, useAuth } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isSignedIn, user, isLoaded: userLoaded } = useUser()
    const { signOut } = useClerk()
    const { userId } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Handle OAuth callback - refresh page after successful OAuth
    useEffect(() => {
        const oauthParam = searchParams.get('oauth')
        if (oauthParam === 'complete') {
            // Wait a bit for Clerk to set the session
            const timer = setTimeout(() => {
                // Clean up URL by removing query params
                const currentPath = window.location.pathname
                router.replace(currentPath)
                // Force a refresh to update UI
                router.refresh()
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [searchParams, router])

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/techbybookk.png"
                            alt="TechByBookk Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <span className="text-xl font-bold text-foreground hidden sm:inline">TechByBookk</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        <Link href="/" className="text-foreground/80 hover:text-accent transition">Home</Link>
                        <Link href="/blog" className="text-foreground/80 hover:text-accent transition">Blog</Link>
                        <a href="#categories" className="text-foreground/80 hover:text-accent transition">Topics</a>
                        <a href="#contact" className="text-foreground/80 hover:text-accent transition">Contact</a>
                        {userLoaded && (isSignedIn || userId) ? (
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition group"
                                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                                >
                                    {user?.imageUrl ? (
                                        <Image
                                            src={user.imageUrl}
                                            alt={user?.fullName || user?.firstName || 'User'}
                                            width={36}
                                            height={36}
                                            className="rounded-full border-2 border-border group-hover:border-accent transition"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center border-2 border-border group-hover:border-accent transition">
                                            <User className="w-5 h-5 text-accent-foreground" />
                                        </div>
                                    )}
                                </button>
                                {isDropdownOpen && (
                                    <div
                                        className="absolute right-0 top-full mt-2 min-w-[200px] bg-background border border-border rounded-lg shadow-lg p-2 z-50"
                                    >
                                        <div className="px-3 py-2 border-b border-border">
                                            <p className="text-sm font-medium text-foreground">
                                                {user?.fullName || user?.firstName || 'User'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {user?.emailAddresses[0]?.emailAddress}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md cursor-pointer outline-none"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-medium"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-muted rounded-lg transition"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
                        <Link href="/" className="text-foreground/80 hover:text-accent transition">Home</Link>
                        <Link href="/blog" className="text-foreground/80 hover:text-accent transition">Blog</Link>
                        <a href="#categories" className="text-foreground/80 hover:text-accent transition">Topics</a>
                        <a href="#contact" className="text-foreground/80 hover:text-accent transition">Contact</a>
                        {userLoaded && (isSignedIn || userId) ? (
                            <div className="flex flex-col gap-2">
                                <div className="px-4 py-2 border-b border-border flex items-center gap-3">
                                    {user?.imageUrl ? (
                                        <Image
                                            src={user.imageUrl}
                                            alt={user?.fullName || user?.firstName || 'User'}
                                            width={40}
                                            height={40}
                                            className="rounded-full border-2 border-border"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border-2 border-border">
                                            <User className="w-5 h-5 text-accent-foreground" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {user?.fullName || user?.firstName || 'User'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.emailAddresses[0]?.emailAddress}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition font-medium text-center"
                            >
                                Login
                            </button>
                        )}
                    </div>
                )}
            </nav>
            <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
        </header>
    )
}
