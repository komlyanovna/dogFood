/* eslint-disable react/no-array-index-key */
/* eslint-disable dot-notation */
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearItems } from '../../redux-toolkit/slices/favoriteSlace/favoriteSlace'
import CardFavorite from '../CardFavorite/CardFavorite'
import { api } from '../Api/Api'
import styles from './styles.module.scss'

export const FAVORITE_CARD = ['FAVORITE_CARD']

const getFavriteItemQueryKey = (cartItemsId) => FAVORITE_CARD.concat(cartItemsId)

export function FavoriteProducts() {
  const dispatch = useDispatch()
  const favoriteId = useSelector((store) => store.favorite.items)

  const { data, isError, isLoading } = useQuery({
    queryKey: getFavriteItemQueryKey(favoriteId.map((card) => card.id)),
    queryFn: () => api.getProductsById(favoriteId.map((card) => card.id)),
  })
  if (isLoading) {
    return <span>Происходит загрузка товаров</span>
  }

  if (isError) {
    return toast.error('К сожалению произошла ошибка! Попробуйте позднее...')
  }

  const clearFavorites = () => dispatch(clearItems())

  return (
    favoriteId.length && data ? (
      <>
        <h5>Товары, которые Вам понравились:</h5>
        <button
          className={styles.button}
          type="button"
          onClick={() => clearFavorites()}
        >
          Очистить избранное
        </button>
        <div className={styles.containerFavorite}>
          {data.map((el, index) => (
            <CardFavorite
              key={index}
              el={el}
            />
          ))}
        </div>
      </>
    ) : (
      <>
        <h3>Товары не найдены</h3>
        <Link to="/catalog">Вернуться в каталог</Link>
      </>
    )
  )
}
