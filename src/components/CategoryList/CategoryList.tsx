import { useState } from 'react'
import fashion from '../../assets/icons/categories/fashion.svg'
import drinks from '../../assets/icons/categories/drinks.svg'
import health from '../../assets/icons/categories/health.svg'
import sports from '../../assets/icons/categories/sports.svg'
import supermarket from '../../assets/icons/categories/supermarket.svg'
import technology from '../../assets/icons/categories/technology.svg'
import tools from '../../assets/icons/categories/tools.svg'
import styles from './CategoryList.module.scss'

const categories = [
  { name: 'Tecnologia', icon: technology },
  { name: 'Supermercado', icon: supermarket },
  { name: 'Bebidas', icon: drinks },
  { name: 'Ferramentas', icon: tools },
  { name: 'Saúde', icon: health },
  { name: 'Esportes e Fitness', icon: sports },
  { name: 'Moda', icon: fashion },
]

export function CategoryList() {
  const [selected, setSelected] = useState(categories[0].name)

  return (
    <section className={styles.section} aria-label="Compre por categoria">
      <ul className={styles.list}>
        {categories.map(({ name, icon }) => (
          <li key={name}>
            <button
              className={styles.item}
              type="button"
              aria-pressed={name === selected}
              onClick={() => setSelected(name)}
            >
              <span className={styles.card}>
                <img src={icon} alt="" width="64" height="64" loading="lazy" />
              </span>
              <span className={styles.label}>{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
