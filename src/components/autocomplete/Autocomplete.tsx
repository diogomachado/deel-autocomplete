import { ChangeEvent, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { Item } from '../../models/item'
import './style.css'

interface AutocompleteProps {
  debounceTime?: number
  isDoneFetch?: boolean
  isLoading?: boolean
  items?: Array<Item>
  handleChange: (term: string) => any
  handleEmpty: () => any
}

export default function Autocomplete(props: AutocompleteProps) {
  const [term, setTerm] = useState('')
  const debounced = useDebounce(term, props.debounceTime || 1000)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value)
  }

  useEffect(() => {
    if (debounced === '') {
      props.handleEmpty()
    } else {
      props.handleChange(debounced)
    }
  }, [debounced])

  return (
    <form data-testid='autocomplete' className='autocomplete'>
      <div className='autocomplete-wrapper'>
        <i className='search'></i>
        <input
          type='search'
          value={term}
          onChange={(event) => handleChange(event)}
          data-testid='autocomplete-input'
          placeholder='Search movie reviews'
          autoFocus={true}
          disabled={props.isLoading}
        />
      </div>

      {props.isLoading ? (
        <div
          className='autocomplete-loading'
          data-testid='autocomplete-loading'
        >
          <p>Loading...</p>
        </div>
      ) : null}

      {props?.isDoneFetch ? (
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
                  <a
                    className='link'
                    target='_blank'
                    rel='noreferrer'
                    href={item.link}
                  >
                    View article
                  </a>
                </div>
              </div>
            )
          })}

          {props.items?.length === 0 &&
          !props.isLoading &&
          props.isDoneFetch ? (
            <p
              className='autocomplete-feedback'
              data-testid='autocomplete-feedback'
            >
              No results were found.
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
