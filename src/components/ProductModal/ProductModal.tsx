import { useId, useState } from 'react'
import type { ShowcaseProduct } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Button } from '../Button'
import { Modal } from '../Modal'
import styles from './ProductModal.module.scss'

interface ProductModalProps {
  /** Selected product; `null` keeps the modal closed. */
  product: ShowcaseProduct | null
  onClose: () => void
  /** Called with the chosen quantity when the user buys; the modal closes afterwards. */
  onAddToCart: (quantity: number) => void
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const titleId = useId()
  const [quantity, setQuantity] = useState(1)

  function handleClose() {
    setQuantity(1)
    onClose()
  }

  function handleBuy() {
    onAddToCart(quantity)
    handleClose()
  }

  return (
    <Modal isOpen={product !== null} onClose={handleClose} labelledBy={titleId}>
      {product && (
        <div className={styles.content}>
          <img className={styles.photo} src={product.photo} alt={product.productName} />
          <div className={styles.details}>
            <h2 id={titleId} className={styles.name}>
              {product.productName}
            </h2>
            <div className={styles.prices}>
              {product.originalPrice !== undefined && (
                <del className={styles.originalPrice}>{formatPrice(product.originalPrice)}</del>
              )}
              <p className={styles.price}>{formatPrice(product.price)}</p>
              {product.installments && (
                <p className={styles.extra}>
                  ou {product.installments.count}x de {formatPrice(product.installments.value)} sem
                  juros
                </p>
              )}
              {product.freeShipping && <p className={styles.freeShipping}>Frete grátis</p>}
            </div>
            <p className={styles.description}>{product.descriptionShort}</p>
            <button className={styles.more} type="button" onClick={handleClose}>
              Veja mais detalhes do produto &gt;
            </button>
            <div className={styles.actions}>
              <div className={styles.quantity} role="group" aria-label="Quantidade">
                <button
                  className={styles.step}
                  type="button"
                  aria-label="Diminuir quantidade"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((value) => value - 1)}
                >
                  −
                </button>
                <output className={styles.value} aria-label="Quantidade selecionada">
                  {String(quantity).padStart(2, '0')}
                </output>
                <button
                  className={styles.step}
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  +
                </button>
              </div>
              <Button className={styles.buy} onClick={handleBuy}>
                COMPRAR
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
