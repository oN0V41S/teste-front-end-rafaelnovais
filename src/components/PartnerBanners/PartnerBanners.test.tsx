import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PartnerBanners } from './PartnerBanners'

describe('PartnerBanners', () => {
  it('renders two banners with a heading and a call to action each', () => {
    render(<PartnerBanners />)

    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getAllByRole('heading', { level: 2, name: 'Parceiros' })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: 'Confira' })).toHaveLength(2)
  })
})
