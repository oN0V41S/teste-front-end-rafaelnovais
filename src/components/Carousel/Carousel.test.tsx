import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Carousel } from './Carousel'

// jsdom has no layout, so the track geometry is faked.
function setupTrack(metrics: { scrollLeft: number; clientWidth: number; scrollWidth: number }) {
  const track = screen.getByRole('list')
  Object.defineProperties(track, {
    scrollLeft: { value: metrics.scrollLeft, configurable: true },
    clientWidth: { value: metrics.clientWidth, configurable: true },
    scrollWidth: { value: metrics.scrollWidth, configurable: true },
  })
  track.scrollBy = vi.fn()
  fireEvent.scroll(track)
  return track
}

function renderCarousel() {
  render(
    <Carousel label="Produtos">
      <li>One</li>
      <li>Two</li>
    </Carousel>,
  )
}

describe('Carousel', () => {
  it('is a named carousel group containing the slides', () => {
    renderCarousel()

    expect(screen.getByRole('group', { name: 'Produtos' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('only enables the arrow that has room to scroll', () => {
    renderCarousel()
    setupTrack({ scrollLeft: 0, clientWidth: 400, scrollWidth: 1000 })

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeEnabled()
  })

  it('disables the next arrow at the end of the track', () => {
    renderCarousel()
    setupTrack({ scrollLeft: 600, clientWidth: 400, scrollWidth: 1000 })

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Próximo' })).toBeDisabled()
  })

  it('scrolls one page per arrow click', async () => {
    renderCarousel()
    const track = setupTrack({ scrollLeft: 300, clientWidth: 400, scrollWidth: 1000 })

    await userEvent.click(screen.getByRole('button', { name: 'Próximo' }))
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: 400, behavior: 'smooth' })

    await userEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -400, behavior: 'smooth' })
  })
})
