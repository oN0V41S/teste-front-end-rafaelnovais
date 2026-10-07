import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Modal } from './Modal'

function Harness() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} labelledBy="title">
        <h2 id="title">Dialog title</h2>
        <button>Inside</button>
      </Modal>
    </>
  )
}

async function openDialog() {
  render(<Harness />)
  await userEvent.click(screen.getByRole('button', { name: 'Open' }))
}

describe('Modal', () => {
  it('stays hidden and renders no content while closed', () => {
    render(<Harness />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Dialog title')).not.toBeInTheDocument()
  })

  it('opens as a dialog named by its heading', async () => {
    await openDialog()

    expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeInTheDocument()
  })

  it('closes with the close button', async () => {
    await openDialog()
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('syncs the state when the browser cancels the dialog (Escape)', async () => {
    await openDialog()
    // Escape makes the browser fire `cancel` and close the dialog itself.
    fireEvent(screen.getByRole('dialog'), new Event('cancel'))

    expect(screen.queryByText('Dialog title')).not.toBeInTheDocument()
  })

  it('closes when clicking the backdrop but not the content', async () => {
    await openDialog()

    await userEvent.click(screen.getByText('Dialog title'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('dialog'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('locks the body scroll while open and restores it on close', async () => {
    await openDialog()
    expect(document.body.style.overflow).toBe('hidden')

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(document.body.style.overflow).toBe('')
  })
})
