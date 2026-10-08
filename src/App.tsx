import { useState } from 'react'
import styles from './App.module.scss'
import { CategoryList } from './components/CategoryList'
import { FilterTabs } from './components/FilterTabs'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PartnerBanners } from './components/PartnerBanners'
import { ProductModal } from './components/ProductModal'
import { ProductShowcase } from './components/ProductShowcase'
import { SectionTitle } from './components/SectionTitle'
import type { ShowcaseProduct } from './types/product'

const filters = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

export default function App() {
  const [filter, setFilter] = useState(filters[0])
  const [selectedProduct, setSelectedProduct] = useState<ShowcaseProduct | null>(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryList />
        <section className={styles.showcase} aria-labelledby="related-products">
          <SectionTitle id="related-products">Produtos relacionados</SectionTitle>
          <FilterTabs
            label="Filtrar produtos"
            options={filters}
            value={filter}
            onChange={setFilter}
          />
          <ProductShowcase label="Produtos relacionados" onSelect={setSelectedProduct} />
        </section>
        <PartnerBanners />
      </main>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
