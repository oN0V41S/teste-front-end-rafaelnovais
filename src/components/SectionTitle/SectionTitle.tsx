import type { ReactNode } from 'react'
import styles from './SectionTitle.module.scss'

interface SectionTitleProps {
  id?: string
  children: ReactNode
}

/** Centered section heading flanked by two divider lines. */
export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className={styles.title}>
      {children}
    </h2>
  )
}
