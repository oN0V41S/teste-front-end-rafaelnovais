/** Product exactly as returned by the products API. */
export interface Product {
  productName: string
  descriptionShort: string
  /** Absolute image URL. */
  photo: string
  /** Whole amount in BRL (e.g. 15000), formatted only at render time. */
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}

/** Product as rendered by the showcases: API data plus mocked commercial fields. */
export interface ShowcaseProduct extends Product {
  id: string
  /** Previous price, shown struck through. */
  originalPrice?: number
  /** Installment plan, e.g. "ou 2x de R$ 49,95 sem juros". */
  installments?: { count: number; value: number }
  freeShipping?: boolean
}
