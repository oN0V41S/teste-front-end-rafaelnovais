import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../services/productsService'

export const productKeys = {
  all: ['products'] as const,
}

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: ({ signal }) => fetchProducts(signal),
  })
}
