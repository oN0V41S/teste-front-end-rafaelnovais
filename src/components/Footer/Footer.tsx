import logo from '../../assets/images/logo.svg'
import styles from './Footer.module.scss'

const columns = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  {
    title: 'Termos',
    links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
  },
]

const socials = [
  {
    name: 'Instagram',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.2-2.2h.01',
  },
  {
    name: 'Facebook',
    path: 'M14 21v-8h3l.5-3H14V8.2c0-1 .4-1.7 1.8-1.7H17.6V3.8A20 20 0 0 0 15.2 3.7C12.8 3.7 11 5.1 11 7.8V10H8v3h3v8',
  },
  {
    name: 'LinkedIn',
    path: 'M4 9h3v11H4V9Zm1.5-5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10 9h3v1.5c.6-1 1.8-1.8 3.4-1.8 3 0 3.6 2 3.6 4.600V20h-3v-5.900c0-1.400-.1-2.600-1.700-2.600S13 12.700 13 14.100V20h-3V9Z',
  },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <img src={logo} alt="Econverse" width="162" height="48" />
          <p className={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className={styles.socials}>
            {socials.map(({ name, path }) => (
              <li key={name}>
                <a className={styles.social} href="#" aria-label={name}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className={styles.nav} aria-label="Rodapé">
          {columns.map(({ title, links }) => (
            <section key={title}>
              <h2 className={styles.title}>{title}</h2>
              <ul className={styles.links}>
                {links.map((link) => (
                  <li key={link}>
                    <a className={styles.link} href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>
      <p className={styles.copyright}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </footer>
  )
}
