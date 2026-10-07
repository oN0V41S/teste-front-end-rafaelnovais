import { ProductCard } from '../ProductCard'
import { useProducts } from '../../hooks/useProducts'
import type { ShowcaseProduct } from '../../types/product'
import styles from './ProductShowcase.module.scss'

interface ProductShowcaseProps {
  onSelect: (product: ShowcaseProduct) => void
}

export function ProductShowcase({ onSelect }: ProductShowcaseProps) {
  const { data: products, isPending, isError, refetch } = useProducts()

  if (isPending) {
    return (
      <p className={styles.message} role="status">
        Carregando produtos...
      </p>
    )
  }

  if (isError) {
    return (
      <div className={styles.message} role="alert">
        <p>Não foi possível carregar os produtos.</p>
        <button className={styles.retry} type="button" onClick={() => refetch()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return <p className={styles.message}>Nenhum produto encontrado.</p>
  }

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
