import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center space-y-6">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-sm text-accent">
                    <a href="https://crazyibookk.vercel.app">Operated by Bookk</a>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                    Insights & Innovation
                    <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        in Tech
                    </span>
                </h1>

                <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-balance">
                    This page was created to update the latest trends in technology for those who are passionate about technology as well as those who are passionate about programming.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/blog" className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition">
                        Explore Articles
                    </Link>
                    <button className="px-8 py-3 border border-border hover:bg-muted rounded-lg font-semibold transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}
