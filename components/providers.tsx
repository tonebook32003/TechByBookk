'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: '#3b82f6',
                },
                elements: {
                    formButtonPrimary: 'bg-accent hover:bg-accent/90 text-accent-foreground',
                },
            }}
        >
            {children}
        </ClerkProvider>
    )
}

