/* eslint-disable dot-notation */
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../Api/Api'
import StyleBasket from './styles.module.scss'
import { CartItem } from './CartItem'
import { useCartProducts } from '../hooks/useCartProducts'

export const PRODUCT_CARD = ['PRODUCT_CARD']

const getCartItemQueryKey = (cartItemsId) => PRODUCT_CARD.concat(cartItemsId)

export function BasketProduct(i) {
  const notification = () => toast.success('Товар удален из корзины!')

  const {
    mainCheckbox,
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
  } = useCartProducts()

  const { data, isError, isLoading } = useQuery({
    queryKey: getCartItemQueryKey(cartId.map((card) => card.id)),
    queryFn: () => api.getProductsById(cartId.map((card) => card.id)),
  })

  if (isLoading) {
    return <span>Происходит загрузка товаров</span>
  }

  if (isError) {
    return toast.error('К сожалению произошла ошибка! Попробуйте позднее...')
  }

  return (
    cartId.length && data ? (
      <div className={StyleBasket.container}>
        <div className={StyleBasket.toggleInput}>
          <input
            type="checkbox"
            checked={mainCheckbox}
            onChange={() => {
              toggleCheckbox()
            }}
            className={StyleBasket.checkboxContainer}
          />
        </div>
        {data.map((el) => (
          <CartItem
            key={el['_id'] + i}
            el={el}
            sale={sale}
            checkedId={checkedId}
            checkedEl={checkedEl}
            priceCount={priceCount}
            onClickRemove={onClickRemove}
            onClickMinus={onClickMinus}
            notification={notification}
            onClickPlus={onClickPlus}
            countId={countId}
          />
        ))}
        <div className={StyleBasket.ordering}>
          <h3>
            Итого:
            {' '}
            {Math.round(totalPrice)}
          </h3>
          <button className={StyleBasket.design} type="button">Оформить заказ</button>
          <button
            className={StyleBasket.clear}
            type="button"
            onClick={() => onClickClearCart()}
          >
            Очистить Корзину
          </button>
          <Link to="/catalog">Вернуться в каталог</Link>
        </div>
      </div>
    )
      : (
        <div>
          <h3>Ваша корзина пуста</h3>
          <Link to="/catalog">Вернуться в каталог</Link>
        </div>
      )
  )
}
