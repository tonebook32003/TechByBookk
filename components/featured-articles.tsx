import { ArrowRight, Calendar, User } from 'lucide-react'
import Link from 'next/link'

const featured = [
    {
        id: 1,
        slug: 'ai-revolution-2025',
        title: 'The AI Revolution: What to Expect in 2025',
        excerpt: 'Exploring the cutting-edge developments in artificial intelligence and their impact on industries worldwide.',
        category: 'AI',
        date: 'Nov 15, 2025',
        author: 'Sarah Chen',
        image: '/images/artificial-intelligence-future.jpg'
    },
    {
        id: 2,
        slug: 'web-performance-optimization',
        title: 'Web Performance: Optimization Strategies That Work',
        excerpt: 'Learn proven techniques to dramatically improve your website speed and user experience scores.',
        category: 'Web Dev',
        date: 'Nov 14, 2025',
        author: 'Alex Rivera',
        image: './images/web-performance-optimization.jpg'
    },
    {
        id: 3,
        slug: 'cybersecurity-trends',
        title: 'Cybersecurity Threats and Defense Strategies',
        excerpt: 'Understanding emerging security threats and implementing robust protection mechanisms for your applications.',
        category: 'Security',
        date: 'Nov 12, 2025',
        author: 'Marcus Johnson',
        image: '/images/cybersecurity-defense.jpg'
    }
]

export function FeaturedArticles() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Articles</h2>
                <p className="text-foreground/60">Handpicked stories from our experts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featured.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`}>
                        <article className="group h-full bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition cursor-pointer">
                            <div className="aspect-video overflow-hidden bg-muted">
                                <img
                                    src={article.image || "/placeholder.svg"}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-foreground/50 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {article.date}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition">
                                    {article.title}
                                </h3>

                                <p className="text-foreground/60 text-sm line-clamp-2">
                                    {article.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <span className="text-xs text-foreground/50 flex items-center gap-1">
                                        <User size={12} />
                                        {article.author}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    )
}
