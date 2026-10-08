import bannerImage from '../../assets/images/banner.png'
import { Button } from '../Button'
import styles from './PartnerBanners.module.scss'

const banners = ['first', 'second']

export function PartnerBanners() {
  return (
    <section className={styles.section} aria-label="Parceiros">
      <ul className={styles.list}>
        {banners.map((id) => (
          <li key={id}>
            <article className={styles.banner}>
              <img
                className={styles.image}
                src={bannerImage}
                alt=""
                width="634"
                height="350"
                loading="lazy"
              />
              <div className={styles.content}>
                <h2 className={styles.title}>Parceiros</h2>
                <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur</p>
                <Button className={styles.button}>Confira</Button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
