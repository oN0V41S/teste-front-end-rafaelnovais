import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchProducts, ProductsServiceError } from './productsService'

const validProduct = {
  productName: 'Product without extras',
  descriptionShort: 'Product without extras',
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

    await expect(fetchProducts()).resolves.toEqual([{ ...validProduct, id: '0' }])
  })

  it('derives the id from the position in the list', async () => {
    mockFetch({
      json: async () => ({
        success: true,
        products: [validProduct, { ...validProduct, productName: 'Other' }],
      }),
    })

    const products = await fetchProducts()

    expect(products.map((product) => product.id)).toEqual(['0', '1'])
  })

  it('merges the mocked extras only into products that have them', async () => {
    mockFetch({
      json: async () => ({
        success: true,
        products: [{ ...validProduct, productName: 'IPHONE 13 MINI 1' }, validProduct],
      }),
    })

    const [withExtras, withoutExtras] = await fetchProducts()

    expect(withExtras).toMatchObject({ originalPrice: 10500, freeShipping: true })
    expect(withoutExtras).not.toHaveProperty('originalPrice')
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
