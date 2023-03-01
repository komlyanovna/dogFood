import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItem, clearItems, minusItem, removeItem, setCheckbox, toggleCheckAll,
} from '../../redux-toolkit/slices/cartSlice/cartSlice'

export function useCartProducts() {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true)
  const [mainCheckbox, setMainCheckbox] = useState(true)

  const cartId = useSelector((store) => store.cart.items)

  const { totalPrice } = useSelector((store) => store.cart)

  const onClickPlus = (id) => {
    dispatch(
      addItem({
        id,
      }),
    )
  }

  const onClickMinus = (id) => {
    dispatch(minusItem(id))
  }

  const onClickRemove = (id) => {
    dispatch(removeItem(id))
  }

  const onClickClearCart = () => {
    dispatch(clearItems())
  }

  const countId = (id) => {
    const objId = cartId.find((obj) => obj.id === id)
    if (!objId) {
      return null
    // eslint-disable-next-line no-else-return
    } else {
      return objId.count
    }
  }

  const priceCount = (id, price) => price * countId(id)

  const toggleCheckbox = () => {
    dispatch(toggleCheckAll())
    setChecked((prev) => !prev)
    setMainCheckbox((prev) => !prev)
    const toggleId = cartId.some((el) => el.checkbox === true)
    if (toggleId === true) {
      setMainCheckbox(false)
    }
  }

  const checkedEl = (id) => {
    dispatch(setCheckbox(id))
    setChecked((prev) => !prev)
    const toggleId = cartId.some((el) => el.checkbox === false)
    if (toggleId === false) {
      setMainCheckbox(false)
    }
    if (toggleId === true) {
      setMainCheckbox(false)
    }
  }

  // eslint-disable-next-line consistent-return
  const checkedId = (id) => {
    const checkedElId = cartId.find((el) => el.id === id)
    if (checkedElId) {
      return checkedElId.checkbox
    }
  }

  const sale = (price, discountActive, id) => {
    if (discountActive !== 0) {
      const countCart = price - (price / discountActive)
      return countCart * countId(id)
    }
    return price * countId(id)
  }

  return {
    checked,
    setChecked,
    mainCheckbox,
    setMainCheckbox,
    cartId,
    totalPrice,
    onClickPlus,
    onClickMinus,
    onClickRemove,
    onClickClearCart,
    countId,
    priceCount,
    toggleCheckbox,
    checkedEl,
    checkedId,
    sale,
  }
}
