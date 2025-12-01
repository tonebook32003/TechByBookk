import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturedArticles } from '@/components/featured-articles'
import { Categories } from '@/components/categories'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedArticles />
      <Categories />
      <Footer />
    </main>
  )
}
