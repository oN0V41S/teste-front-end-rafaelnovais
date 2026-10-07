import type { Product, ProductsResponse } from '../types/product'

const DEFAULT_PRODUCTS_API_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export class ProductsServiceError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'ProductsServiceError'
  }
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.productName === 'string' &&
    typeof item.descriptionShort === 'string' &&
    typeof item.photo === 'string' &&
    typeof item.price === 'number'
  )
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== 'object' || value === null) return false
  const body = value as Record<string, unknown>
  return body.success === true && Array.isArray(body.products) && body.products.every(isProduct)
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const url = import.meta.env.VITE_PRODUCTS_API_URL || DEFAULT_PRODUCTS_API_URL

  let response: Response
  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ProductsServiceError('Could not reach the products API.', { cause: error })
  }

  if (!response.ok) {
    throw new ProductsServiceError(`Products API responded with status ${response.status}.`)
  }

  let body: unknown
  try {
    body = await response.json()
  } catch (error) {
    throw new ProductsServiceError('Products API returned invalid JSON.', { cause: error })
  }

  if (!isProductsResponse(body)) {
    throw new ProductsServiceError('Products API returned an unexpected payload.')
  }

  return body.products
}
