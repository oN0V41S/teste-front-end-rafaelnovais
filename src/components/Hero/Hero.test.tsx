import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('has the page heading', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Venha conhecer nossas promoções' }),
    ).toBeInTheDocument()
  })

  it('highlights the offer', () => {
    render(<Hero />)

    expect(screen.getByText('50% Off')).toBeInTheDocument()
  })

  it('has the call to action', () => {
    render(<Hero />)

    expect(screen.getByRole('button', { name: 'Ver produto' })).toBeInTheDocument()
  })
})
