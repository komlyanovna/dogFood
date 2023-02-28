/* eslint-disable no-restricted-globals */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddProducts } from '../AddProducts/AddProducts'
import { api } from '../Api/Api'
import { Sort } from '../Sort/Sort'
import Card from './Card'
import StyleCardItem from './style.module.scss'
import { ratingItem } from './utils'

export const RENDER_CARD = ['RENDER_CARD']
export const getContactsQueryKey = (value) => RENDER_CARD.concat(Object.values(value))
export function CardItems({ onClickAdd, i }) {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const [sort, setSort] = useState(() => searchParams.get('filter') ?? '')

  useEffect(() => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), filter: sort })
  }, [sort])

  const search = useSelector((store) => store.search)

  const token = useSelector((store) => store.user)

  const notification = () => toast.success('Товар добавлен в корзину!')

  const {
    data, status, isError,
  } = useQuery({
    queryKey: getContactsQueryKey(search),
    queryFn: () => api.getCardItem({
      query: search.searchValue,
    }),
    enabled: !!token,
  })

  const onClickSort = () => {
    if (sort === 'created_at') {
      const createdAt = data.data.products.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
      return createdAt
    }
    if (sort === 'price+') {
      const priceMore = data.data.products.sort((a, b) => a.price < b.price ? 1 : -1)
      return priceMore
    }
    if (sort === 'price-') {
      const priceLess = data.data.products.sort((a, b) => a.price > b.price ? 1 : -1)
      return priceLess
    }
    if (sort === 'rating') {
      const ratingItems = data.data.products.sort((a, b) => {
        const rateElA = a.reviews.map((item) => item.rating)
        const rateElB = b.reviews.map((item) => item.rating)
        // eslint-disable-next-line no-unused-expressions
        return ratingItem(rateElA) < ratingItem(rateElB) ? 1 : -1
      })
      return ratingItems
    }
    if (sort === 'sale') {
      const sale = data.data.products.sort((a, b) => b.discount > a.discount ? 1 : -1)
      return sale
    }
    if (sort === 'data') {
      return data.data.products.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
    }
    return data.data.products
  }

  if (status === 'loading') {
    return <h3>Loading...</h3>
  }
  if (isError) {
    return (
      <div>
        Error:
        {isError.message}
      </div>
    )
  }

  return (
    data.data && data.data.products
      ? (
        <>
          <Sort
            value={sort}
            onClickSort={(item) => setSort(item)}
            sortData={onClickSort()}
          />
          <AddProducts />
          <div className={StyleCardItem.conteinerCard}>
            {data.data.products.map((el) => (
              <Card
                el={el}
                notification={notification}
                onClickAdd={onClickAdd}
                navigate={navigate}
                key={el['_id'] + i}
              />
            ))}

          </div>
        </>
      )
      : null
  )
}
