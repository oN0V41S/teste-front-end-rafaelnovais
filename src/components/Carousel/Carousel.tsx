import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Carousel.module.scss'

interface CarouselProps {
  /** Accessible name of the carousel. */
  label: string
  /** The slides: `<li>` elements. */
  children: ReactNode
}

/**
 * Horizontal carousel built on native scrolling (scroll-snap), so touch, trackpad and keyboard
 * focus work for free; the arrows only scroll the track by one visible page.
 */
export function Carousel({ label, children }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollPrev(track.scrollLeft > 0)
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows, children])

  function scrollByPage(direction: -1 | 1) {
    const track = trackRef.current
    track?.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
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
      <ul ref={trackRef} className={styles.track} onScroll={updateArrows}>
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
