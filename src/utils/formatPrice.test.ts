import { describe, expect, it } from 'vitest'
import { formatPrice } from './formatPrice'

// Intl separates the symbol and the amount with a non-breaking space.
const normalize = (text: string) => text.replace(/\u00a0/g, ' ')

describe('formatPrice', () => {
  it.each([
    [28.9, 'R$ 28,90'],
    [1499.9, 'R$ 1.499,90'],
    [15000, 'R$ 15.000,00'],
    [0, 'R$ 0,00'],
  ])('formats %s as %s', (value, expected) => {
    expect(normalize(formatPrice(value))).toBe(expected)
  })
})
