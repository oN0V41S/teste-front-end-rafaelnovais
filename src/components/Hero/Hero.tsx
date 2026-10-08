import heroImage from '../../assets/images/hero.jpg'
import { Button } from '../Button'
import styles from './Hero.module.scss'

export function Hero() {
  return (
    <section className={styles.hero}>
      <img
        className={styles.background}
        src={heroImage}
        alt=""
        width="1440"
        height="390"
        fetchPriority="high"
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Venha conhecer nossas promoções</h1>
        <p className={styles.offer}>
          <strong>50% Off</strong> nos produtos
        </p>
        <Button className={styles.button}>Ver produto</Button>
      </div>
    </section>
  )
}
