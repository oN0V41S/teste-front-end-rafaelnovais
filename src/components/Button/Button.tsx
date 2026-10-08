import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// Yellow call-to-action. Size and spacing are set by whoever uses it.
export function Button({ className, type = 'button', ...props }: ButtonProps) {
  const classes = className ? `${styles.button} ${className}` : styles.button

  return <button className={classes} type={type} {...props} />
}
