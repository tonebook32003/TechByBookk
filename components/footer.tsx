import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer id="contact" className="mt-20 border-t border-border bg-card/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-foreground mb-4">TechByBookk</h3>
                        <p className="text-sm text-foreground/60">
                            Insights and innovation in technology, delivered daily.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition">Blog</Link></li>
                            <li><a href="#categories" className="hover:text-accent transition">Topics</a></li>
                            <li><a href="#contact" className="hover:text-accent transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm text-foreground/60">
                            <li><a href="#" className="hover:text-accent transition">AI & ML</a></li>
                            <li><a href="#" className="hover:text-accent transition">Web Dev</a></li>
                            <li><a href="#" className="hover:text-accent transition">Security</a></li>
                            <li><a href="#" className="hover:text-accent transition">DevOps</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                                <Github size={18} />
                            </a>
                            <a href="#" className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                                <Twitter size={18} />
                            </a>
                            <a href="mailto:hello@TechByBookk.com" className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
                    <p>&copy; 2025 TechByBookk. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-accent transition">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
