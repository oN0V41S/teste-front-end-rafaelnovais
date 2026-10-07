import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionTitle } from './SectionTitle'

describe('SectionTitle', () => {
  it('renders a level 2 heading', () => {
    render(<SectionTitle>Produtos relacionados</SectionTitle>)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Produtos relacionados' }),
    ).toBeInTheDocument()
  })
})
