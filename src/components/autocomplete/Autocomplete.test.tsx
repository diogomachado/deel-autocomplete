import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete'

const handleChange = jest.fn()
const handleEmpty = jest.fn()

describe('Autocomplete component', () => {
  it('should render the component', () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )
    const block = screen.getByTestId('autocomplete')
    expect(block).toBeInTheDocument()
  })

  it('should render a input type equals search', () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )
    const input = screen.getByTestId('autocomplete-input')
    expect(input).toHaveProperty('type', 'search')
  })

  it('should not exhibit feedback before submit', () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )
    expect(
      screen.queryByTestId('autocomplete-feedback')
    ).not.toBeInTheDocument()
  })

  it('should have a placeholder `Search movie reviews`', () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )
    const block = screen.getByPlaceholderText('Search movie reviews')
    expect(block).toBeInTheDocument()
  })

  it('should have autofocus enabled', () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )
    expect(screen.getByTestId('autocomplete-input')).toHaveFocus()
  })

  it('should not exhibit results when user clear the input', async () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )

    const inputText = ''
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)

    expect(screen.queryByTestId('autocomplete-results')).not.toBeInTheDocument()
  })

  it('should props.handleEmpty() when the user clear the input', async () => {
    render(
      <Autocomplete handleChange={handleChange} handleEmpty={handleEmpty} />
    )

    const inputText = ''
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')

    await userEvent.type(input, inputText)
    await fireEvent.change(form)

    expect(handleEmpty).toHaveBeenCalledTimes(1)
  })
})
