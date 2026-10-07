import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchProducts, ProductsServiceError } from './productsService'

const validProduct = {
  productName: 'Iphone 11 PRO MAX BRANCO 1',
  descriptionShort: 'Iphone 11 PRO MAX BRANCO 1',
  photo: 'https://example.com/foto.png',
  price: 15000,
}

function mockFetch(response: Partial<Response> | Error) {
  const fetchMock =
    response instanceof Error
      ? vi.fn().mockRejectedValue(response)
      : vi.fn().mockResolvedValue({ ok: true, status: 200, ...response })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchProducts', () => {
  it('returns the products of a valid response', async () => {
    mockFetch({ json: async () => ({ success: true, products: [validProduct] }) })

    await expect(fetchProducts()).resolves.toEqual([validProduct])
  })

  it('forwards the abort signal to fetch', async () => {
    const fetchMock = mockFetch({ json: async () => ({ success: true, products: [] }) })
    const { signal } = new AbortController()

    await fetchProducts(signal)

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), { signal })
  })

  it('throws when the HTTP status is not ok', async () => {
    mockFetch({ ok: false, status: 500 })

    await expect(fetchProducts()).rejects.toThrow(/status 500/)
  })

  it('throws a ProductsServiceError when the network fails', async () => {
    mockFetch(new TypeError('Failed to fetch'))

    await expect(fetchProducts()).rejects.toBeInstanceOf(ProductsServiceError)
  })

  it('throws when the body is not valid JSON', async () => {
    mockFetch({
      json: async () => {
        throw new SyntaxError('Unexpected token')
      },
    })

    await expect(fetchProducts()).rejects.toThrow(/invalid JSON/)
  })

  it.each([
    ['success is false', { success: false, products: [] }],
    ['products is not an array', { success: true, products: null }],
    [
      'a product has a wrong field type',
      { success: true, products: [{ ...validProduct, price: '15000' }] },
    ],
  ])('throws when %s', async (_label, payload) => {
    mockFetch({ json: async () => payload })

    await expect(fetchProducts()).rejects.toThrow(/unexpected payload/)
  })
})
