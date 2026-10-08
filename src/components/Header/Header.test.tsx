import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('is the page banner with the brand logo', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Econverse' })).toBeInTheDocument()
  })

  it('lists the store benefits', () => {
    render(<Header />)

    expect(screen.getByText('100% segura')).toBeInTheDocument()
    expect(screen.getByText(/acima de R\$ 200/)).toBeInTheDocument()
  })

  it('has a search field that keeps the typed text on submit', async () => {
    render(<Header />)
    const field = screen.getByRole('searchbox', { name: 'Buscar' })

    await userEvent.type(field, 'iphone{enter}')

    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(field).toHaveValue('iphone')
  })

  it('exposes the account actions by name', () => {
    render(<Header />)

    for (const name of ['Favoritos', 'Minha conta', 'Carrinho']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    }
  })

  it('has a category navigation', () => {
    render(<Header />)

    const nav = screen.getByRole('navigation', { name: 'Categorias' })

    expect(nav).toHaveTextContent('Ofertas do dia')
    expect(nav).toHaveTextContent('Assinatura')
  })

  it('shows how many items are in the cart', () => {
    const { rerender } = render(<Header />)
    expect(screen.getByRole('button', { name: 'Carrinho' })).toBeInTheDocument()

    rerender(<Header cartCount={3} />)

    expect(screen.getByRole('button', { name: 'Carrinho, 3 itens' })).toHaveTextContent('3')
  })
})
