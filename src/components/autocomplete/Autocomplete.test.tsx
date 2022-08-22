import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete from './Autocomplete'

const handleSubmit = jest.fn()

describe('Autocomplete component', () => {
  it('should render the component', () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    const block = screen.getByTestId('autocomplete')
    expect(block).toBeInTheDocument()
  })

  it('should render a input type equals search', () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    const input = screen.getByTestId('autocomplete-input')
    expect(input).toHaveProperty('type', 'search')
  })

  it('should not exhibit feedback before submit', () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    expect(
      screen.queryByTestId('autocomplete-feedback')
    ).not.toBeInTheDocument()
  })

  it('should have a placeholder `Search movie reviews`', () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    const block = screen.getByPlaceholderText('Search movie reviews')
    expect(block).toBeInTheDocument()
  })

  it('should have autofocus enabled', () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    expect(screen.getByTestId('autocomplete-input')).toHaveFocus()
  })

  it('should call props.handleSubmit() when form is submitted', async () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    const form = screen.getByTestId('autocomplete')

    await fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call props.handleSubmit() with the user input', async () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)

    const inputText = 'some text here'
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)
    expect(handleSubmit).toHaveBeenCalledWith(inputText)
  })

  it('should exhibit two result items', async () => {
    const dataItems = [
      {
        id: 1,
        title: 'Movie 1',
        description: 'Movie 1 ipsum lorem'
      },
      {
        id: 2,
        title: 'Movie 2',
        description: 'Movie 2 ipsum lorem'
      }
    ]

    render(<Autocomplete items={dataItems} handleSubmit={handleSubmit} />)
    const inputText = 'some text here'
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)

    const elements = screen.queryAllByTestId('autocomplete-item')

    expect(elements.length).toEqual(2)
  })

  it('should exhibit a feedback `No results` when the API return nothing', async () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)
    const inputText = 'some text here'
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')
    const elements = screen.queryAllByTestId('autocomplete-item')

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)

    expect(elements.length).toEqual(0)
    expect(screen.getByTestId('autocomplete-feedback')).toHaveTextContent(
      'No results'
    )
  })

  it('should not exhibit results when user clear the input', async () => {
    render(<Autocomplete handleSubmit={handleSubmit} />)

    const inputText = ''
    const form = screen.getByTestId('autocomplete')
    const input = screen.getByTestId('autocomplete-input')

    await userEvent.type(input, inputText)
    await fireEvent.submit(form)

    expect(screen.queryByTestId('autocomplete-results')).not.toBeInTheDocument()
  })
})
