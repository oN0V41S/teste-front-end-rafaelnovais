import { useId } from 'react'
import type { ShowcaseProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Modal } from '../Modal'
import styles from './ProductModal.module.scss'

interface ProductModalProps {
  /** Selected product; `null` keeps the modal closed. */
  product: ShowcaseProduct | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const titleId = useId()

  return (
    <Modal isOpen={product !== null} onClose={onClose} labelledBy={titleId}>
      {product && (
        <div className={styles.content}>
          <img className={styles.photo} src={product.photo} alt={product.productName} />
          <div className={styles.details}>
            <h2 id={titleId} className={styles.name}>
              {product.productName}
            </h2>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <p className={styles.description}>{product.descriptionShort}</p>
            <p className={styles.more}>Veja mais detalhes do produto &gt;</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
