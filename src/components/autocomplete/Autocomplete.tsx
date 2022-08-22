import { ChangeEvent, FormEvent, useState } from 'react'
import { Item } from '../../models/item'
import './style.css'

interface AutocompleteProps {
  items?: Array<Item>
  handleSubmit: (term: string) => any
}

export default function Autocomplete(props: AutocompleteProps) {
  const [term, setTerm] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleAutocomplete(term: string, e: FormEvent) {
    e.preventDefault()
    setSubmitted(term === '' ? false : true)
    props.handleSubmit(term)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (value === '') {
      setSubmitted(false)
    }
    setTerm(value)
  }

  return (
    <form
      onSubmit={(e) => handleAutocomplete(term, e)}
      data-testid='autocomplete'
      className='autocomplete'
    >
      <input
        type='search'
        value={term}
        onChange={(event) => handleChange(event)}
        data-testid='autocomplete-input'
        placeholder='Search movie reviews'
        autoFocus={true}
      />

      {submitted ? (
        <div
          className='autocomplete-results'
          data-testid='autocomplete-results'
        >
          {props?.items?.map((item) => {
            return (
              <div
                key={item.id}
                data-testid='autocomplete-item'
                className='item'
              >
                <div className='details'>
                  <div
                    className='title'
                    dangerouslySetInnerHTML={{
                      __html: item.title
                    }}
                  />
                  <p className='description'>{item.description}</p>
                </div>
              </div>
            )
          })}

          {!props.items && submitted ? (
            <p data-testid='autocomplete-feedback'>No results</p>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
