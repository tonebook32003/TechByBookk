'use client'

import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BlogPostData {
    title: string
    author: string
    date: string
    category: string
    readTime: string
    image: string
    content: string
}

const posts: Record<string, BlogPostData> = {
    'ai-revolution-2025': {
        title: 'The AI Revolution: What to Expect in 2025',
        author: 'Sarah Chen',
        date: 'Nov 15, 2025',
        category: 'Artificial Intelligence',
        readTime: '8 min read',
        image: './images/artificial-intelligence-future.jpg',
        content: `
# The AI Revolution: What to Expect in 2025

Artificial Intelligence has moved from academic research to everyday applications that transform how we work, create, and solve problems. As we look ahead to 2025, the landscape of AI is becoming increasingly sophisticated and accessible.

## Current State of AI

The rapid advancement in large language models has democratized AI capabilities. Organizations across all sectors are now implementing AI solutions that previously seemed like science fiction. From healthcare diagnostics to personalized learning systems, AI is becoming integral to modern infrastructure.

### Key Areas of Innovation

- **Generative AI**: More refined and specialized models for specific domains
- **Multimodal AI**: Systems that seamlessly work with text, images, and video
- **Edge AI**: Running powerful models directly on devices
- **Ethical AI**: Better frameworks for responsible AI deployment

## What's Coming in 2025

### 1. Specialized Models Dominate

We'll see a shift from general-purpose models to highly specialized AI systems trained for specific industries. Healthcare, finance, and manufacturing will have purpose-built AI solutions.

### 2. AI Agents Become Practical

Autonomous AI agents that can take action, make decisions, and collaborate with humans will move from concept to production use.

### 3. Energy Efficiency Takes Center Stage

As AI companies grapple with massive computational costs, efficient models and better training methods will become competitive advantages.

### 4. Regulatory Frameworks Solidify

Governments worldwide will establish clearer guidelines for AI use, data privacy, and accountability.

## Preparing Your Organization

1. **Invest in talent**: Hire people who understand both AI and your domain
2. **Start with data**: Ensure you have quality, organized data
3. **Begin small**: Pilot projects reduce risk and build internal expertise
4. **Think about ethics**: Build responsible AI from the ground up

The AI revolution isn't coming—it's already here. The question is how your organization will adapt and thrive in this new era.
    `
    },
    'web-performance-optimization': {
        title: 'Web Performance: Optimization Strategies That Work',
        author: 'Alex Rivera',
        date: 'Nov 14, 2025',
        category: 'Web Development',
        readTime: '12 min read',
        image: '/web-performance.jpg',
        content: `
# Web Performance: Optimization Strategies That Work

In 2025, users expect websites to load instantly and respond immediately. Slow websites don't just frustrate users—they lose revenue, traffic, and trust. This guide covers proven optimization strategies that deliver real results.

## Why Performance Matters

Every 100ms delay in website load time can result in a 1% decrease in conversion rate. For e-commerce sites, this translates to significant lost revenue. Performance isn't just a technical concern—it's a business imperative.

## Core Web Vitals

Google's Core Web Vitals measure three key aspects of user experience:

1. **Largest Contentful Paint (LCP)**: How quickly the main content loads
2. **First Input Delay (FID)**: How responsive the page is to user input
3. **Cumulative Layout Shift (CLS)**: How stable the page layout remains while loading

## Optimization Strategies

### Image Optimization
- Use modern formats like WebP and AVIF
- Implement responsive images with srcset
- Lazy load below-the-fold images
- Compress ruthlessly with appropriate tools

### Code Splitting
- Split JavaScript bundles by route
- Load only what's needed for initial render
- Defer non-critical JavaScript

### Caching Strategy
- Use service workers for offline capability
- Implement browser caching headers
- Use CDNs for static assets
- Cache API responses intelligently

### Database Optimization
- Index frequently queried columns
- Optimize database queries
- Implement query result caching
- Consider database sharding for scale

## Tools and Measurement

Use these tools to measure and improve performance:

- **Lighthouse**: Built-in browser tool for performance audits
- **WebPageTest**: Detailed performance analysis
- **Real User Monitoring (RUM)**: Track actual user experience
- **Sentry**: Monitor errors and performance issues

The best performance optimization strategy is one you actually implement. Start with the biggest bottlenecks and work your way down.
    `
    },
    'cybersecurity-trends': {
        title: 'Cybersecurity Threats and Defense Strategies',
        author: 'Marcus Johnson',
        date: 'Nov 12, 2025',
        category: 'Security',
        readTime: '10 min read',
        image: '/cybersecurity-network.png',
        content: `
# Cybersecurity Threats and Defense Strategies

The threat landscape continues to evolve at an alarming pace. As threats become more sophisticated, organizations must adopt equally sophisticated defense strategies. This article explores current threats and actionable defense mechanisms.

## Current Threat Landscape

### Supply Chain Attacks
Attackers are targeting software supply chains, compromising libraries and dependencies used by thousands of companies.

### Ransomware Evolution
Ransomware actors are becoming more targeted, focusing on high-value targets and demanding unprecedented sums.

### AI-Powered Attacks
Attackers are using machine learning to automate reconnaissance and exploit discovery.

## Defense Strategy

### Zero Trust Architecture
Stop trusting based on location. Implement:
- Micro-segmentation
- Continuous verification
- Least privilege access
- Detailed monitoring and logging

### Security Awareness
- Regular training for employees
- Phishing simulations
- Clear security policies
- Incident response procedures

### Technical Controls
- Use strong authentication (MFA)
- Encrypt data in transit and at rest
- Regular security updates
- Vulnerability scanning and penetration testing

## Implementation Priorities

1. **Inventory**: Know what you have
2. **Protect**: Secure critical assets
3. **Detect**: Monitor for threats
4. **Respond**: Have an incident response plan
5. **Recover**: Backup and disaster recovery

Security is an ongoing process, not a destination. Stay vigilant and keep improving your defenses.
    `
    }
}

export function BlogPost({ slug }: { slug: string }) {
    const post = posts[slug]

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto py-12">
                <Link href="/blog" className="text-accent hover:text-accent/80 flex items-center gap-2 mb-6">
                    <ArrowLeft size={18} />
                    Back to Blog
                </Link>
                <div className="text-center py-12">
                    <h1 className="text-3xl font-bold mb-4">Article not found</h1>
                    <p className="text-foreground/60">This article might have been moved or deleted.</p>
                </div>
            </div>
        )
    }

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/blog" className="text-accent hover:text-accent/80 flex items-center gap-2 mb-8">
                <ArrowLeft size={18} />
                Back to Blog
            </Link>

            <header className="mb-8 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded">
                        {post.category}
                    </span>
                    <span className="text-sm text-foreground/50 flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                    </span>
                    <span className="text-sm text-foreground/50">{post.readTime}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                    {post.title}
                </h1>

                <div className="text-sm text-foreground/60 flex items-center gap-1 pt-4">
                    <User size={14} />
                    {post.author}
                </div>
            </header>

            <div className="mb-8 rounded-xl overflow-hidden">
                <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-auto aspect-video object-cover"
                />
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
                {post.content.split('\n\n').map((paragraph: string, idx: number) => {
                    if (paragraph.startsWith('#')) {
                        const level = paragraph.match(/^#+/)?.[0].length || 1
                        const text = paragraph.replace(/^#+\s/, '')
                        const className = {
                            1: 'text-3xl font-bold text-foreground',
                            2: 'text-2xl font-bold text-foreground',
                            3: 'text-xl font-bold text-foreground'
                        }[level] || 'text-foreground'
                        return (
                            <div key={idx} className={className}>
                                {text}
                            </div>
                        )
                    }
                    if (paragraph.startsWith('-')) {
                        return (
                            <ul key={idx} className="list-disc list-inside space-y-2 text-foreground/80">
                                {paragraph.split('\n').map((item, i) => (
                                    <li key={i}>{item.replace(/^-\s/, '')}</li>
                                ))}
                            </ul>
                        )
                    }
                    if (paragraph.match(/^\d+\./)) {
                        return (
                            <ol key={idx} className="list-decimal list-inside space-y-2 text-foreground/80">
                                {paragraph.split('\n').map((item, i) => (
                                    <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                                ))}
                            </ol>
                        )
                    }
                    return (
                        <p key={idx} className="text-base leading-relaxed">
                            {paragraph}
                        </p>
                    )
                })}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <p className="text-sm text-foreground/50 mb-2">Written by</p>
                    <p className="font-semibold text-foreground">{post.author}</p>
                </div>
                <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition">
                    Share Article
                </button>
            </div>
        </article>
    )
}
