import * as React from 'react'
import {Products} from './Products.model'

interface Context {
  products: Products | null
  setProducts: React.Dispatch<React.SetStateAction<Products | null>>
  error: Error | null
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
}

export {Context}
