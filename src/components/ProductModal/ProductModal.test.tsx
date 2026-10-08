import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ShowcaseProduct } from '../../types/product'
import { ProductModal } from './ProductModal'

const product: ShowcaseProduct = {
  id: '0',
  productName: 'Iphone 13',
  descriptionShort: 'A phone.',
  photo: 'https://example.com/iphone.png',
  price: 1500,
}

describe('ProductModal', () => {
  it('renders nothing while no product is selected', () => {
    render(<ProductModal product={null} onClose={vi.fn()} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the selected product, named by its heading', () => {
    render(<ProductModal product={product} onClose={vi.fn()} />)

    expect(screen.getByRole('dialog', { name: 'Iphone 13' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Iphone 13' })).toHaveAttribute('src', product.photo)
    expect(screen.getByText(/1\.500,00/)).toBeInTheDocument()
    expect(screen.getByText('A phone.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Veja mais detalhes/ })).toBeInTheDocument()
  })

  it('calls onClose from the close button', async () => {
    const onClose = vi.fn()
    render(<ProductModal product={product} onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('changes the quantity but never below one', async () => {
    render(<ProductModal product={product} onClose={vi.fn()} />)
    const quantity = screen.getByLabelText('Quantidade selecionada')

    expect(screen.getByRole('button', { name: 'Diminuir quantidade' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    expect(quantity).toHaveTextContent('02')
    await userEvent.click(screen.getByRole('button', { name: 'Diminuir quantidade' }))
    expect(quantity).toHaveTextContent('01')
  })

  it('shows the extra commercial fields when the product has them', () => {
    render(
      <ProductModal
        product={{
          ...product,
          originalPrice: 2000,
          installments: { count: 2, value: 750 },
          freeShipping: true,
        }}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByText(/2.000,00/)).toBeInTheDocument()
    expect(screen.getByText(/ou 2x de/)).toBeInTheDocument()
    expect(screen.getByText('Frete grátis')).toBeInTheDocument()
  })

  it('closes from the "see more" button', async () => {
    const onClose = vi.fn()
    render(<ProductModal product={product} onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: /Veja mais detalhes/ }))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
