import { useState } from 'react'
import styles from './App.module.scss'
import { BrandList } from './components/BrandList'
import { CategoryList } from './components/CategoryList'
import { FilterTabs } from './components/FilterTabs'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PartnerBanners } from './components/PartnerBanners'
import { ProductModal } from './components/ProductModal'
import { ProductSection } from './components/ProductSection'
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
        <ProductSection
          id="related-products"
          title="Produtos relacionados"
          onSelect={setSelectedProduct}
        >
          <FilterTabs
            label="Filtrar produtos"
            options={filters}
            value={filter}
            onChange={setFilter}
          />
        </ProductSection>
        <PartnerBanners />
        <ProductSection
          id="related-products-2"
          title="Produtos relacionados"
          onSelect={setSelectedProduct}
        >
          <a className={styles.viewAll} href="#">
            Ver todos
          </a>
        </ProductSection>
        <BrandList />
        <ProductSection
          id="related-products-3"
          title="Produtos relacionados"
          onSelect={setSelectedProduct}
        >
          <a className={styles.viewAll} href="#">
            Ver todos
          </a>
        </ProductSection>
      </main>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
