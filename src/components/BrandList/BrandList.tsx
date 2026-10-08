import logo from '../../assets/images/logo.svg'
import styles from './BrandList.module.scss'

// The layout repeats the same placeholder brand five times.
const brands = ['brand-1', 'brand-2', 'brand-3', 'brand-4', 'brand-5']

export function BrandList() {
  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <h2 id="brands-title" className={styles.title}>
        Navegue por marcas
      </h2>
      <ul className={styles.list}>
        {brands.map((brand) => (
          <li key={brand}>
            <button className={styles.item} type="button">
              <img src={logo} alt="Econverse" width="117" height="35" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
