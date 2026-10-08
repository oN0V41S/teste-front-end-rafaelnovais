import type { ReactNode } from 'react'
import { ProductShowcase } from '../ProductShowcase'
import { SectionTitle } from '../SectionTitle'
import type { ShowcaseProduct } from '../../types/product'
import styles from './ProductSection.module.scss'

interface ProductSectionProps {
  id: string
  title: string
  /** Content between the title and the carousel (filter tabs, "Ver todos" link...). */
  children?: ReactNode
  onSelect: (product: ShowcaseProduct) => void
}

export function ProductSection({ id, title, children, onSelect }: ProductSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <SectionTitle id={id}>{title}</SectionTitle>
      {children}
      <ProductShowcase label={title} onSelect={onSelect} />
    </section>
  )
}
