import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandList } from './BrandList'

describe('BrandList', () => {
  it('renders the section heading and five brands', () => {
    render(<BrandList />)

    expect(screen.getByRole('heading', { name: 'Navegue por marcas' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getAllByRole('button', { name: /^Econverse, marca \d$/ })).toHaveLength(5)
  })
})
