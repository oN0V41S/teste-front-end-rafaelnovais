import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Newsletter } from './Newsletter'

describe('Newsletter', () => {
  it('renders the heading and the form fields', () => {
    render(<Newsletter />)

    expect(
      screen.getByRole('heading', { name: 'Inscreva-se na nossa newsletter' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeRequired()
    expect(screen.getByLabelText('E-mail')).toBeRequired()
    expect(screen.getByRole('checkbox', { name: /termos e condições/ })).toBeRequired()
  })

  it('confirms the subscription after a valid submit', async () => {
    render(<Newsletter />)

    await userEvent.type(screen.getByLabelText('Nome'), 'Ana')
    await userEvent.type(screen.getByLabelText('E-mail'), 'ana@example.com')
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('button', { name: 'INSCREVER' }))

    expect(screen.getByRole('status')).toHaveTextContent('Obrigado')
  })
})
