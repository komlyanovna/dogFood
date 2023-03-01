/* eslint-disable func-names */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite } from '../../redux-toolkit/slices/favoriteSlace/favoriteSlace'
import { addItem } from '../../redux-toolkit/slices/cartSlice/cartSlice'

export function cardItem(Component) {
  return function (props) {
    const { ...otherProps } = props
    const dispatch = useDispatch()
    // eslint-disable-next-line no-unused-vars
    const [favorite, setFavorite] = useState()

    const onClickFavorite = (id) => {
      const item = {
        id,
      }
      dispatch(addFavorite(item))
      setFavorite((prev) => !prev)
    }

    const onClickAdd = (id, price, discount, pictures, name, stock) => {
      const item = {
        id,
        price,
        discount,
        pictures,
        name,
        stock,
      }
      dispatch(addItem(item))
    }

    const favoriteId = useSelector((store) => store.favorite.items)

    const favoriteEl = (id) => {
      const find = favoriteId.find((elem) => elem.id === id)
      if (find) {
        return true
      }
      if (!find) {
        return false
      }
      return find
    }
    return (
      <Component
        {...otherProps}
        onClickFavorite={onClickFavorite}
        favoriteEl={favoriteEl}
        onClickAdd={onClickAdd}
      />
    )
  }
}
