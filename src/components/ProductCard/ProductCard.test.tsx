import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ShowcaseProduct } from '../../types/product'
import { ProductCard } from './ProductCard'

const baseProduct: ShowcaseProduct = {
  id: 'iphone-1',
  productName: 'Iphone 11 PRO MAX BRANCO 1',
  descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
  photo: 'https://example.com/foto.png',
  price: 28.9,
}

describe('ProductCard', () => {
  it('renders name, photo and price', () => {
    render(<ProductCard product={baseProduct} onSelect={vi.fn()} />)

    expect(screen.getByRole('heading', { name: baseProduct.productName })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: baseProduct.productName })).toHaveAttribute(
      'src',
      baseProduct.photo,
    )
    expect(screen.getByText(/R\$\s28,90/)).toBeInTheDocument()
  })

  it('does not render the optional commercial fields when absent', () => {
    render(<ProductCard product={baseProduct} onSelect={vi.fn()} />)

    expect(screen.queryByText(/sem juros/)).not.toBeInTheDocument()
    expect(screen.queryByText('Frete grátis')).not.toBeInTheDocument()
    expect(screen.getAllByText(/R\$/)).toHaveLength(1)
  })

  it('renders original price, installments and free shipping when provided', () => {
    render(
      <ProductCard
        product={{
          ...baseProduct,
          originalPrice: 30.9,
          installments: { count: 2, value: 49.95 },
          freeShipping: true,
        }}
        onSelect={vi.fn()}
      />,
    )

    expect(screen.getByText(/R\$\s30,90/).tagName).toBe('DEL')
    expect(screen.getByText(/ou 2x de R\$\s49,95 sem juros/)).toBeInTheDocument()
    expect(screen.getByText('Frete grátis')).toBeInTheDocument()
  })

  it('calls onSelect with the product when the buy button is clicked', async () => {
    const onSelect = vi.fn()
    render(<ProductCard product={baseProduct} onSelect={onSelect} />)

    await userEvent.click(screen.getByRole('button', { name: /comprar/i }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(baseProduct)
  })
})
