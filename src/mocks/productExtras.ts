import type { ShowcaseProduct } from '../types/product'

export type ProductExtras = Pick<ShowcaseProduct, 'originalPrice' | 'installments' | 'freeShipping'>

/** Commercial fields the API does not provide (ADR-0005), keyed by `productName`. Only some items have them. */
export const productExtras: Record<string, ProductExtras> = {
  'Iphone 11 PRO MAX BRANCO 1': {
    originalPrice: 17990,
    installments: { count: 10, value: 1500 },
    freeShipping: true,
  },
  'IPHONE 13 MINI 1': { originalPrice: 10500, freeShipping: true },
  'Iphone 11 PRO MAX BRANCO 2': { installments: { count: 2, value: 7495 } },
  'IPHONE 13 MINI 2': { installments: { count: 4, value: 3000 }, freeShipping: true },
  'Iphone 11 PRO MAX BRANCO 3': { originalPrice: 5200 },
  'IPHONE 13 MINI 4': { installments: { count: 2, value: 260 } },
  'IPHONE 13 MINI 5': {
    originalPrice: 119990,
    installments: { count: 10, value: 10000 },
    freeShipping: true,
  },
}
