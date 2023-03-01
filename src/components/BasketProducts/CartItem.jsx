/* eslint-disable dot-notation */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyleBasket from './styles.module.scss'

export function CartItem({
  el,
  checkedId,
  checkedEl,
  sale,
  priceCount,
  countId,
  onClickMinus,
  onClickPlus,
  notification,
  onClickRemove,
}) {
  return (

    <div className={StyleBasket.basketCard} key={el['_id']}>
      <div className={StyleBasket.input}>
        <input
          type="checkbox"
          checked={checkedId(el['_id'])}
          onChange={() => checkedEl(el['_id'])}
          className={StyleBasket.checkbox}
        />
      </div>
      <img className={StyleBasket.img} src={el.pictures} alt="Изображение" />
      <p>{el.name}</p>
      {el.discount ? (
        <>
          <p>
            {sale(el.price, el.discount, el['_id'])}
            {' '}
            Руб.
          </p>
          <p className={StyleBasket.priceActive}>
            {priceCount(el['_id'], el.price)}
            {' '}
            Руб
          </p>
        </>
      ) : (
        <p>
          {sale(el.price, el.discount, el['_id'])}
          {' '}
          Руб.
        </p>
      )}
      {countId(el['_id']) === 1 ? (
        <button
          className={StyleBasket.btnCounter}
          type="button"
          disabled
        >
          -
        </button>
      ) : (
        <button
          className={StyleBasket.btnCounter}
          type="button"
          onClick={() => {
            onClickMinus(el['_id'])
          }}
        >
          -
        </button>
      )}
      <div>
        {countId(el['_id'])}
      </div>
      {countId(el['_id']) === el.stock ? (
        <button
          className={StyleBasket.btnCounter}
          type="button"
          disabled
        >
          +
        </button>
      ) : (
        <button
          className={StyleBasket.btnCounter}
          type="button"
          onClick={() => {
            onClickPlus(el['_id'])
          }}
        >
          +
        </button>

      )}
      <button
        className={StyleBasket.trash}
        type="button"
        onClick={() => {
          notification()
          onClickRemove(el['_id'])
        }}
      >
        <FontAwesomeIcon icon={solid('trash')} />
      </button>
    </div>
  )
}
