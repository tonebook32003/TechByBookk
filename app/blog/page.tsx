import { Header } from '@/components/header'
import { BlogList } from '@/components/blog-list'
import { Footer } from '@/components/footer'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <BlogList />
      </div>
      <Footer />
    </main>
  )
}
