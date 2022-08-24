import React, { useState } from 'react'
import Autocomplete from './components/autocomplete/Autocomplete'
import { Item } from './models/item'
import { ItemFactory } from './models/item.factory'
import { Highlight } from './utils/highlight'

function App() {
  const defaultTextHelp = 'Type "Top gun" for example'
  const [textHelp, setTextHelp] = useState(defaultTextHelp)
  const [items, setItems] = useState(Array<Item>)
  const [isLoading, setIsLoading] = useState(false)
  const [isDoneFetch, setIsDoneFetch] = useState(false)
  const API_URL = process.env.REACT_APP_API_URL || ''
  const API_KEY = process.env.REACT_APP_API_KEY || ''

  function handleEmpty() {
    setTextHelp(defaultTextHelp)
    setItems([])
    setIsLoading(false)
    setIsDoneFetch(false)
  }

  async function fetchMovieReviews(term: string) {
    return fetch(
      `${API_URL}/svc/movies/v2/reviews/search.json?query=${term}&api-key=${API_KEY}`
    ).then((resp) => resp.json())
  }

  async function handleSearchAPI(term: string) {
    // Turn on the loading on the component
    setIsLoading(true)

    try {
      // Call the API
      const movies = await fetchMovieReviews(term)

      if (movies.status === 'OK' && movies.num_results > 0) {
        let moviesFactory = movies?.results?.map((book: any, i: number) => {
          return ItemFactory(i, book)
        })
        moviesFactory = Highlight(moviesFactory, term)
        setItems(moviesFactory)
      }
      // Set some control status
      setIsLoading(false)
      setIsDoneFetch(true)
    } catch (e) {
      setIsLoading(false)
      setTextHelp('Something wrong happens, try again after 5 sec')
    }
  }

  return (
    <div className='wrapper'>
      <section className='autocomplete-wrapper'>
        <Autocomplete
          debounceTime={600}
          items={items}
          isLoading={isLoading}
          isDoneFetch={isDoneFetch}
          handleChange={(term) => handleSearchAPI(term)}
          handleEmpty={() => handleEmpty()}
        />
        <div className='text-helper'>{textHelp}</div>
      </section>
    </div>
  )
}

export default App
