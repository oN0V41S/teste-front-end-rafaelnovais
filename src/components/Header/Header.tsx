import type { FormEvent } from 'react'
import cardIcon from '../../assets/icons/card.svg'
import cartIcon from '../../assets/icons/cart.svg'
import crownIcon from '../../assets/icons/crown.svg'
import heartIcon from '../../assets/icons/heart.svg'
import searchIcon from '../../assets/icons/search.svg'
import shieldIcon from '../../assets/icons/shield.svg'
import storeIcon from '../../assets/icons/store.svg'
import truckIcon from '../../assets/icons/truck.svg'
import userIcon from '../../assets/icons/user.svg'
import logo from '../../assets/images/logo.svg'
import styles from './Header.module.scss'

const benefits = [
  { icon: shieldIcon, highlight: '100% segura', before: 'Compra ', after: '' },
  { icon: truckIcon, highlight: 'Frete grátis', before: '', after: ' acima de R$ 200' },
  { icon: cardIcon, highlight: 'Parcele', before: '', after: ' suas compras' },
]

const actions = [
  { icon: storeIcon, label: 'Meus pedidos' },
  { icon: heartIcon, label: 'Favoritos' },
  { icon: userIcon, label: 'Minha conta' },
]

const categories = ['Todas categorias', 'Supermercado', 'Livros', 'Moda', 'Lançamentos']

function handleSearch(event: FormEvent) {
  event.preventDefault()
}

interface HeaderProps {
  /** Number of items in the cart, shown as a badge on the cart button. */
  cartCount?: number
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const cartLabel = cartCount > 0 ? `Carrinho, ${cartCount} itens` : 'Carrinho'

  return (
    <header className={styles.header}>
      <ul className={styles.benefits}>
        {benefits.map(({ icon, highlight, before, after }) => (
          <li key={highlight} className={styles.benefit}>
            <img src={icon} alt="" width="20" height="20" />
            <span>
              {before}
              <strong>{highlight}</strong>
              {after}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.main}>
        <a className={styles.logo} href="/">
          <img src={logo} alt="Econverse" width="139" height="41" />
        </a>

        <form className={styles.search} role="search" onSubmit={handleSearch}>
          <input
            type="search"
            name="q"
            placeholder="O que você está buscando?"
            aria-label="Buscar"
          />
          <button type="submit" aria-label="Buscar produtos">
            <img src={searchIcon} alt="" width="24" height="24" />
          </button>
        </form>

        <div className={styles.actions}>
          {actions.map(({ icon, label }) => (
            <button key={label} type="button" aria-label={label}>
              <img src={icon} alt="" width="32" height="32" />
            </button>
          ))}
          <button type="button" className={styles.cart} aria-label={cartLabel}>
            <img src={cartIcon} alt="" width="32" height="32" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Categorias">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <a href="#">{category}</a>
            </li>
          ))}
          <li>
            <a className={styles.highlight} href="#">
              Ofertas do dia
            </a>
          </li>
          <li>
            <a href="#">
              <img src={crownIcon} alt="" width="20" height="20" />
              Assinatura
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
