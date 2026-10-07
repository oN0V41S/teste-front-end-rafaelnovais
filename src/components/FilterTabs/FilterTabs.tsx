import styles from './FilterTabs.module.scss'

interface FilterTabsProps {
  /** Accessible name of the group. */
  label: string
  options: string[]
  value: string
  onChange: (option: string) => void
}

/** Row of toggle buttons where exactly one option is active. */
export function FilterTabs({ label, options, value, onChange }: FilterTabsProps) {
  return (
    <div className={styles.tabs} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          className={styles.tab}
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
