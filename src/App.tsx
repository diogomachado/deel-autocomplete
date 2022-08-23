import React, { useEffect, useState } from 'react'
import Autocomplete from './components/autocomplete/Autocomplete'
import { Item } from './models/item'
import { ItemFactory } from './models/item.factory'
import { Highlight } from './utils/highlight'

function App() {
  const [items, setItems] = useState(Array<Item>)
  const [isLoading, setIsLoading] = useState(false)
  const [isDoneFetch, setIsDoneFetch] = useState(false)
  const API_URL = process.env.REACT_APP_API_URL || ''
  const API_KEY = process.env.REACT_APP_API_KEY || ''

  function handleEmpty() {
    console.log('HandleEmpty...')
    setItems([])
    setIsLoading(false)
    setIsDoneFetch(false)
  }

  function handleSearchAPI(term: string) {
    setIsLoading(true)

    // console.log('App component searching...', term)
    // const dataItems = [
    //   {
    //     id: 1,
    //     title: 'Movie 1',
    //     link: 'https://developer.nytimes.com/docs/books-product/1/overview'
    //   },
    //   {
    //     id: 2,
    //     title: 'Movie 2',
    //     link: 'https://developer.nytimes.com/docs/books-product/1/overview'
    //   }
    // ]
    // setItems(term ? dataItems : [])

    // Call to API NYC
    fetch(
      `${API_URL}/svc/movies/v2/reviews/search.json?query=${term}&api-key=${API_KEY}`
    ).then((resp) =>
      resp.json().then((movies) => {
        if (movies.status === 'OK' && movies.num_results > 0) {
          let moviesFactory = movies?.results?.map((book: any, i: number) => {
            return ItemFactory(i, book)
          })
          moviesFactory = Highlight(moviesFactory, term)
          setItems(moviesFactory)
          setIsLoading(false)
          setIsDoneFetch(true)
        }
      })
    )
  }

  return (
    <div className='wrapper'>
      <Autocomplete
        items={items}
        isLoading={isLoading}
        isDoneFetch={isDoneFetch}
        handleChange={(term) => handleSearchAPI(term)}
        handleEmpty={() => handleEmpty()}
      />
    </div>
  )
}

export default App
