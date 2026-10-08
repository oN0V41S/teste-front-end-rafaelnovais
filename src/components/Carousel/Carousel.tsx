import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Carousel.module.scss'

interface CarouselProps {
  /** Accessible name of the carousel. */
  label: string
  /** The slides: `<li>` elements. */
  children: ReactNode
}

/**
 * Horizontal carousel built on native scrolling (scroll-snap), so touch, trackpad and keyboard
 * focus work for free; the arrows scroll the track by exactly one page of slides.
 */
export function Carousel({ label, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollPrev(track.scrollLeft > 0)
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1)

    // The track has side padding (room for the card shadows); the page is what is inside it.
    // Slides outside the page get `data-offpage`, which fades and blurs them (see the styles).
    const { paddingLeft, paddingRight } = getComputedStyle(track)
    const bounds = track.getBoundingClientRect()
    const left = bounds.left + (parseFloat(paddingLeft) || 0)
    const right = bounds.right - (parseFloat(paddingRight) || 0)
    for (const slide of Array.from(track.children)) {
      const rect = slide.getBoundingClientRect()
      const onPage = rect.left >= left - 1 && rect.right <= right + 1
      slide.toggleAttribute('data-offpage', !onPage)
    }
  }, [])

  useLayoutEffect(() => {
    update()
  }, [update, children])

  useEffect(() => {
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  function scrollByPage(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return

    const { paddingLeft, paddingRight, columnGap } = getComputedStyle(track)
    const page =
      track.clientWidth - (parseFloat(paddingLeft) || 0) - (parseFloat(paddingRight) || 0)
    track.scrollBy({ left: direction * (page + (parseFloat(columnGap) || 0)), behavior: 'smooth' })
  }

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button
        className={`${styles.arrow} ${styles.prev}`}
        type="button"
        aria-label="Anterior"
        disabled={!canScrollPrev}
        onClick={() => scrollByPage(-1)}
      >
        <svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true">
          <path d="M6.5 1 1.5 6l5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <ul ref={trackRef} className={styles.track} onScroll={update}>
        {children}
      </ul>
      <button
        className={`${styles.arrow} ${styles.next}`}
        type="button"
        aria-label="Próximo"
        disabled={!canScrollNext}
        onClick={() => scrollByPage(1)}
      >
        <svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true">
          <path d="m1.5 1 5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
    </div>
  )
}
