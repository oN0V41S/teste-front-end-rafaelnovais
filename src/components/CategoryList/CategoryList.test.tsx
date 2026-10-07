import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CategoryList } from './CategoryList'

describe('CategoryList', () => {
  it('renders the categories as buttons', () => {
    render(<CategoryList />)

    expect(screen.getByRole('region', { name: 'Compre por categoria' })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('starts with Tecnologia selected', () => {
    render(<CategoryList />)

    expect(screen.getByRole('button', { name: 'Tecnologia' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('moves the selection to the clicked category', async () => {
    const user = userEvent.setup()
    render(<CategoryList />)

    await user.click(screen.getByRole('button', { name: 'Moda' }))

    expect(screen.getByRole('button', { name: 'Moda' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Tecnologia' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
