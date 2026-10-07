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
