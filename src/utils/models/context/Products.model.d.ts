import {Product} from './Product.model'

interface Products {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Product[] | Product
  support: {
    url: string
    text: string
  }
}

export {Products}
