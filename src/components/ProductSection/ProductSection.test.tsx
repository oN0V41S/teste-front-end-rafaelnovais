import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProductSection } from './ProductSection'

describe('ProductSection', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the title as the section name and the subheader content', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})),
    )
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })

    render(
      <QueryClientProvider client={client}>
        <ProductSection id="t" title="Produtos relacionados" onSelect={() => {}}>
          <a href="#">Ver todos</a>
        </ProductSection>
      </QueryClientProvider>,
    )

    expect(screen.getByRole('region', { name: 'Produtos relacionados' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver todos' })).toBeInTheDocument()
  })
})
