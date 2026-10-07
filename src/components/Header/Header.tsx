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
  { icon: cartIcon, label: 'Carrinho' },
]

const categories = ['Todas categorias', 'Supermercado', 'Livros', 'Moda', 'Lançamentos']

function handleSearch(event: FormEvent) {
  event.preventDefault()
}

export function Header() {
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
