import { Item } from './item'

export function ItemFactory(index: number, data: any) {
  return {
    id: index,
    title: data?.book_title,
    description: data?.summary
  } as Item
}
