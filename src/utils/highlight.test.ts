import { Highlight } from './highlight'

describe('highlight check', () => {
  it('should return the title formated with HTML <mark>', () => {
    const list = [
      {
        id: 1,
        title: 'Movie 1'
      },
      {
        id: 2,
        title: 'Movie 2'
      }
    ]

    const listExpected = [
      {
        id: 1,
        title: '<mark>Movie</mark> 1'
      },
      {
        id: 2,
        title: '<mark>Movie</mark> 2'
      }
    ]

    expect(Highlight(list, 'Movie')).toEqual(listExpected)
  })
})
