import type { ShowcaseProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: ShowcaseProduct
  onSelect: (product: ShowcaseProduct) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { productName, photo, price, originalPrice, installments, freeShipping } = product

  return (
    <article className={styles.card}>
      <img className={styles.photo} src={photo} alt={productName} loading="lazy" />
      <h3 className={styles.name}>{productName}</h3>

      <div className={styles.prices}>
        {originalPrice !== undefined && (
          <del className={styles.originalPrice}>{formatPrice(originalPrice)}</del>
        )}
        <p className={styles.price}>{formatPrice(price)}</p>
      </div>

      {installments && (
        <p className={styles.installments}>
          ou {installments.count}x de {formatPrice(installments.value)} sem juros
        </p>
      )}
      {freeShipping && <p className={styles.freeShipping}>Frete grátis</p>}

      {/* The ::after of this button stretches over the whole card, making it clickable. */}
      <button
        type="button"
        className={styles.buy}
        aria-label={`Comprar ${productName}`}
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  )
}
