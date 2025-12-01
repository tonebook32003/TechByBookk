import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BlogPost } from '@/components/blog-post'

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <BlogPost slug={params.slug} />
      </div>
      <Footer />
    </main>
  )
}
