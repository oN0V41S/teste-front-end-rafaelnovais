import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('is a non-submitting button by default', () => {
    render(<Button>Confira</Button>)

    expect(screen.getByRole('button', { name: 'Confira' })).toHaveAttribute('type', 'button')
  })

  it('calls onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Confira</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Confira' }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
