import { waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchProducts, ProductsServiceError } from '../services/productsService'
import { renderHookWithQueryClient } from '../test/renderWithQueryClient'
import { useProducts } from './useProducts'

vi.mock('../services/productsService', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../services/productsService')>()),
  fetchProducts: vi.fn(),
}))

const product = {
  id: '0',
  productName: 'Iphone 11 PRO MAX BRANCO 1',
  descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
  photo: 'https://example.com/foto.png',
  price: 15000,
}

beforeEach(() => {
  vi.mocked(fetchProducts).mockReset()
})

describe('useProducts', () => {
  it('starts loading and then exposes the products', async () => {
    vi.mocked(fetchProducts).mockResolvedValue([product])

    const { result } = renderHookWithQueryClient(() => useProducts())

    expect(result.current.isPending).toBe(true)
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual([product])
  })

  it('exposes the error when the service fails', async () => {
    const error = new ProductsServiceError('boom')
    vi.mocked(fetchProducts).mockRejectedValue(error)

    const { result } = renderHookWithQueryClient(() => useProducts())

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBe(error)
  })
})
