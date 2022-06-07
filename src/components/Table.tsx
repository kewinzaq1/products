import * as React from 'react'
import {
  Box,
  Pagination,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Table as MuiTable,
  TableBody,
  Alert
} from '@mui/material'
import {useProducts} from '../context'

const mainStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100vw',
  height: '100vh',
  flexDirection: 'column'
}

const headerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem'
}

const Table = () => {
  const {products, url, setUrl, error} = useProducts()
  const [page, setPage] = React.useState(1)
  const [displayedProducts, setDisplayedProducts] = React.useState(
    products?.data
  )
  const idRef = React.createRef<HTMLInputElement>()

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    const newUrl = url.replace(`page=${page}`, `page=${value}`)
    setUrl(newUrl)
  }

  const handleId = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url.includes('id')) {
      const newUrl = url.split('&id')[0] + `&id=${idRef.current?.value}`
      setUrl(newUrl)
    } else {
      const newUrl = `${url}&id=${idRef.current?.value}`
      setUrl(newUrl)
    }
  }

  React.useEffect(() => {
    setDisplayedProducts(products?.data)
  }, [products?.data])

  return (
    <Box component={'main'} sx={mainStyles}>
      <Box component={'header'} sx={headerStyles}>
        <Box>
          <Typography>/ Products</Typography>
          <Typography variant={'h4'} component={'h1'}>
            Discover our product's
          </Typography>
          {error && <Alert severity="error">{error.message}</Alert>}
        </Box>
        <Box component={'form'} onSubmit={handleId} sx={{width: '100%'}}>
          <TextField
            variant={'outlined'}
            type={'number'}
            label={'product id'}
            inputRef={idRef}
            inputProps={{
              max: products?.total,
              min: 1
            }}
            sx={{
              width: '100%'
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{maxWidth: '640px'}}>
        <MuiTable aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">id</TableCell>
              <TableCell align="right">year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts ? (
              displayedProducts instanceof Array ? (
                displayedProducts.map(product => (
                  <TableRow
                    key={product.id}
                    sx={{
                      '&:last-child td, &:last-child th': {border: 0},
                      backgroundColor: product.color
                    }}
                  >
                    <TableCell>{product.name}</TableCell>
                    <TableCell align={'right'}>{product.id}</TableCell>
                    <TableCell align={'right'}>{product.year}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  key={displayedProducts.id}
                  sx={{
                    '&:last-child td, &:last-child th': {border: 0},
                    backgroundColor: displayedProducts.color
                  }}
                >
                  <TableCell>{displayedProducts.name}</TableCell>
                  <TableCell align={'right'}>{displayedProducts.id}</TableCell>
                  <TableCell align={'right'}>
                    {displayedProducts.year}
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell>
                  <Typography sx={{padding: '1rem'}}>
                    Oops! Not Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Pagination count={products?.total_pages} onChange={handlePage} />
    </Box>
  )
}

export {Table}
