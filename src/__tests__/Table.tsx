import {render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ProductsProvider} from '../context'
import {Table} from '../components/Table'

test('render table heading', () => {
  render(
    <ProductsProvider>
      <Table />
    </ProductsProvider>
  )

  expect(screen.getByRole('heading')).toHaveTextContent(
    /discover our product's/i
  )
  expect(screen.getByText(/products/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/product id/i)).toBeInTheDocument()
})

test('render table with data from API', async () => {
  render(
    <ProductsProvider>
      <Table />
    </ProductsProvider>
  )

  await waitFor(async () => {
    await screen.findByText(/cerulean/i)
  })

  expect(
    screen.getByRole('table', {name: /products table/i})
  ).toBeInTheDocument()
  expect(screen.getAllByRole('row')).toHaveLength(6)

  expect(
    screen.getByRole('navigation', {name: /pagination navigation/i})
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', {name: /go to previous page/i})
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', {name: /go to next page/i})
  ).toBeInTheDocument()
})

test('switch between table pages', async () => {
  render(
    <ProductsProvider>
      <Table />
    </ProductsProvider>
  )

  await waitFor(async () => {
    await screen.findByText(/cerulean/i)
  })

  expect(
    screen.getByRole('navigation', {name: /pagination navigation/i})
  ).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', {name: /go to next page/i}))
  await waitFor(async () => {
    await screen.findByRole('cell', {name: '6'})
  })
  expect(screen.getByRole('button', {current: true})).toHaveTextContent('2')
  expect(screen.getAllByRole('row')).toHaveLength(6)

  await userEvent.click(screen.getByRole('button', {name: /go to next page/i}))
  await waitFor(async () => {
    await screen.findByRole('cell', {name: '11'})
  })
  expect(screen.getByRole('button', {current: true})).toHaveTextContent('3')
  expect(screen.getAllByRole('row')).toHaveLength(3)

  await userEvent.click(screen.getByRole('button', {name: /go to page 1/i}))
  await waitFor(async () => {
    await screen.findByRole('cell', {name: '1'})
  })
  expect(screen.getByRole('button', {current: true})).toHaveTextContent('1')
  expect(screen.getAllByRole('row')).toHaveLength(6)
})
