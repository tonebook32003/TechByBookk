const categories = [
  { name: 'Artificial Intelligence', count: 24, color: 'from-cyan-500 to-blue-600' },
  { name: 'Web Development', count: 18, color: 'from-blue-500 to-purple-600' },
  { name: 'Cybersecurity', count: 15, color: 'from-purple-500 to-pink-600' },
  { name: 'Cloud Computing', count: 12, color: 'from-pink-500 to-red-600' },
  { name: 'DevOps', count: 9, color: 'from-red-500 to-orange-600' },
  { name: 'Mobile Dev', count: 14, color: 'from-orange-500 to-yellow-600' },
]

export function Categories() {
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Explore Topics</h2>
        <p className="text-foreground/60">Browse our curated collection by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="group p-6 rounded-xl border border-border hover:border-accent bg-card hover:bg-card/80 transition cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} mb-4 opacity-80 group-hover:opacity-100 transition`} />
            <h3 className="text-lg font-bold text-foreground mb-2">{category.name}</h3>
            <p className="text-sm text-foreground/60">{category.count} articles</p>
          </div>
        ))}
      </div>
    </section>
  )
}
