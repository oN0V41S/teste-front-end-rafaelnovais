import { useState, type FormEvent } from 'react'
import { Button } from '../Button'
import styles from './Newsletter.module.scss'

// Front-end only: there is no endpoint, so a valid submit just shows the confirmation.
export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 id="newsletter-title" className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.subtitle}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>
        {subscribed ? (
          <p className={styles.success} role="status">
            Obrigado! Sua inscrição foi realizada.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.field}
              type="text"
              name="name"
              placeholder="Digite seu nome"
              aria-label="Nome"
              autoComplete="name"
              required
            />
            <input
              className={styles.field}
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              aria-label="E-mail"
              autoComplete="email"
              required
            />
            <Button className={styles.submit} type="submit">
              INSCREVER
            </Button>
            <label className={styles.terms}>
              <input type="checkbox" name="terms" required />
              Aceito os termos e condições
            </label>
          </form>
        )}
      </div>
    </section>
  )
}
