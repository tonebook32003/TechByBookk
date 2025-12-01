import { Calendar, User } from 'lucide-react'
import Link from 'next/link'

const allArticles = [
  {
    id: 1,
    slug: 'ai-revolution-2025',
    title: 'The AI Revolution: What to Expect in 2025',
    excerpt: 'Exploring the cutting-edge developments in artificial intelligence and their impact on industries worldwide.',
    category: 'AI',
    date: 'Nov 15, 2025',
    author: 'Sarah Chen'
  },
  {
    id: 2,
    slug: 'web-performance-optimization',
    title: 'Web Performance: Optimization Strategies That Work',
    excerpt: 'Learn proven techniques to dramatically improve your website speed and user experience scores.',
    category: 'Web Dev',
    date: 'Nov 14, 2025',
    author: 'Alex Rivera'
  },
  {
    id: 3,
    slug: 'cybersecurity-trends',
    title: 'Cybersecurity Threats and Defense Strategies',
    excerpt: 'Understanding emerging security threats and implementing robust protection mechanisms for your applications.',
    category: 'Security',
    date: 'Nov 12, 2025',
    author: 'Marcus Johnson'
  },
  {
    id: 4,
    slug: 'react-best-practices',
    title: 'React Best Practices: Building Scalable Applications',
    excerpt: 'Master advanced React patterns and techniques for building maintainable, high-performance applications.',
    category: 'Web Dev',
    date: 'Nov 10, 2025',
    author: 'Emily Watson'
  },
  {
    id: 5,
    slug: 'cloud-native-architecture',
    title: 'Cloud-Native Architecture: From Theory to Practice',
    excerpt: 'A comprehensive guide to designing and implementing cloud-native applications with microservices.',
    category: 'Cloud',
    date: 'Nov 8, 2025',
    author: 'James Park'
  },
  {
    id: 6,
    slug: 'blockchain-enterprise',
    title: 'Blockchain Technology in Enterprise Solutions',
    excerpt: 'Discovering practical applications of blockchain beyond cryptocurrencies in business systems.',
    category: 'Blockchain',
    date: 'Nov 5, 2025',
    author: 'Lisa Zhang'
  }
]

export function BlogList() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Latest Articles</h1>
        <p className="text-lg text-foreground/60">Discover the latest insights in technology</p>
      </div>

      <div className="space-y-6">
        {allArticles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <article className="group p-6 m-2 rounded-xl border border-border bg-card hover:border-accent hover:bg-card/80 transition cursor-pointer">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-foreground/50 flex items-center gap-1">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition">
                    {article.title}
                  </h2>

                  <p className="text-foreground/60">
                    {article.excerpt}
                  </p>

                  <div className="text-sm text-foreground/50 flex items-center gap-1 pt-2">
                    <User size={14} />
                    {article.author}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
