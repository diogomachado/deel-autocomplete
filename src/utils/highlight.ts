import { Item } from '../models/item'

export function Highlight(list: Array<Item>, term: string) {
  return list.map((item) => {
    const textContent = item.title.match(new RegExp(`${term}`, 'gi'))

    if (textContent) {
      return {
        ...item,
        title: item.title.replace(
          new RegExp(`${term}`, 'gi'),
          `<mark>${textContent[0]}</mark>`
        )
      }
    } else {
      return item
    }
  })
}
