import * as React from 'react'
import {Products} from '../utils/models/context/Products.model'
import axios, {AxiosResponse} from 'axios'
import {Context} from '../utils/models/context/Context.model'
import {INITIAL_API_URL} from '../utils'

const ProductsContext = React.createContext<null | Context>(null)

const ProductsProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = React.useState<null | Products>(null)
  const [error, setError] = React.useState<null | Error>(null)
  const [url, setUrl] = React.useState(INITIAL_API_URL)

  React.useMemo(() => {
    setError(null)
    axios
      .get(url)
      .then((response: AxiosResponse<Products>) => {
        setProducts(response.data)
      })
      .catch(error => setError(error))
  }, [url])

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        error,
        setError,
        url,
        setUrl
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => {
  const context = React.useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts() used only within ProductsProvider!')
  }
  return context
}

export {ProductsContext, ProductsProvider, useProducts}
