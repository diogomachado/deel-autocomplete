import { Item } from './item'

export function ItemFactory(index: number, data: any) {
  return {
    id: index,
    title: data?.display_title,
    link: data?.link?.url
  } as Item
}
