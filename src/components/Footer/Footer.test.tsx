import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders the three link groups', () => {
    render(<Footer />)

    for (const name of ['Institucional', 'Ajuda', 'Termos']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(within(screen.getByRole('navigation')).getAllByRole('link')).toHaveLength(9)
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
