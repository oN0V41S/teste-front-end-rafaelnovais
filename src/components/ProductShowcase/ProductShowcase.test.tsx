import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useProducts } from '../../hooks/useProducts'
import type { ShowcaseProduct } from '../../types/product'
import { ProductShowcase } from './ProductShowcase'

vi.mock('../../hooks/useProducts')

const products: ShowcaseProduct[] = [
  { id: '0', productName: 'Iphone A', descriptionShort: 'A', photo: 'a.png', price: 100 },
  { id: '1', productName: 'Iphone B', descriptionShort: 'B', photo: 'b.png', price: 200 },
]

function mockUseProducts(state: Partial<ReturnType<typeof useProducts>>) {
  vi.mocked(useProducts).mockReturnValue({
    data: undefined,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
    ...state,
  } as ReturnType<typeof useProducts>)
}

beforeEach(() => {
  vi.mocked(useProducts).mockReset()
})

describe('ProductShowcase', () => {
  it('shows a status message while loading', () => {
    mockUseProducts({ isPending: true })

    render(<ProductShowcase label="Produtos" onSelect={vi.fn()} />)

    expect(screen.getByRole('status')).toHaveTextContent(/carregando/i)
  })

  it('shows an alert and retries when loading fails', async () => {
    const refetch = vi.fn()
    mockUseProducts({ isError: true, refetch })

    render(<ProductShowcase label="Produtos" onSelect={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /tentar novamente/i }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(refetch).toHaveBeenCalledTimes(1)
  })

  it('shows a message when there are no products', () => {
    mockUseProducts({ data: [] })

    render(<ProductShowcase label="Produtos" onSelect={vi.fn()} />)

    expect(screen.getByText(/nenhum produto/i)).toBeInTheDocument()
  })

  it('renders one card per product in a list', () => {
    mockUseProducts({ data: products })

    render(<ProductShowcase label="Produtos" onSelect={vi.fn()} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Iphone B' })).toBeInTheDocument()
  })

  it('reports the clicked product', async () => {
    const onSelect = vi.fn()
    mockUseProducts({ data: products })

    render(<ProductShowcase label="Produtos" onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: 'Comprar Iphone B' }))

    expect(onSelect).toHaveBeenCalledWith(products[1])
  })
})
