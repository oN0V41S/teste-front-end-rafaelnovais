import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FilterTabs } from './FilterTabs'

const options = ['celular', 'tablets', 'tvs']

describe('FilterTabs', () => {
  it('marks only the current option as pressed', () => {
    render(<FilterTabs label="Categorias" options={options} value="tablets" onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'tablets' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'celular' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('reports the clicked option', async () => {
    const onChange = vi.fn()
    render(<FilterTabs label="Categorias" options={options} value="celular" onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'tvs' }))

    expect(onChange).toHaveBeenCalledWith('tvs')
  })
})
