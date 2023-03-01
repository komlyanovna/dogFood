/* eslint-disable dot-notation */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { addItem } from '../../redux-toolkit/slices/cartSlice/cartSlice'
import { ratingItem, sale } from '../CardItem/utils'
import { cardItem } from '../hooks/cardItem'
import styles from './styles.module.scss'

function CardFavorite({
  el, favoriteEl, onClickFavorite, onClickAdd,
}) {
  // eslint-disable-next-line no-unused-vars
  const [favorite, setFavorite] = useState()
  const navigate = useNavigate()

  const notification = () => toast.success('Товар добавлен в корзину!')

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerInfo}>
        {favoriteEl(el['_id']) ? (
          <FontAwesomeIcon
            title="Удалить из избранного"
            className={styles.active}
            icon={solid('heart')}
            onClick={() => {
              onClickFavorite(el['_id'])
            }}
          />
        ) : null }
        <div className={styles.image}>
          <img className={styles.img} src={el.pictures} alt="Изображение" />
        </div>
        <h4 className={styles.name}>{el.name}</h4>
        {el.discount ? (
          <>
            <p>
              {sale(el.price, el.discount)}
              <FontAwesomeIcon className={styles.rub} icon={solid('ruble-sign')} />
            </p>
            <p className={styles.priceActive}>
              {el.price}
              {' '}
              <FontAwesomeIcon className={styles.rub} icon={solid('ruble-sign')} />
            </p>
            <p className={styles.discount}>
              -
              {el.discount}
              %
            </p>
          </>
        ) : (
          <p className={styles.price}>
            {el.price}
            {' '}
            <FontAwesomeIcon className={styles.rub} icon={solid('ruble-sign')} />
          </p>
        )}
        <FontAwesomeIcon className={styles.star} icon={solid('star')} />
        <p>
          {ratingItem(el.reviews.map((item) => item.rating))}
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.btn}
            type="button"
            onClick={() => {
              notification()
              onClickAdd(el['_id'], el.price, el.discount, el.pictures, el.name)
            }}
          >
            В корзину
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => {
              const id = el['_id']
              navigate(`/catalog/${id}`)
            }}
          >
            Подробнее о товаре
          </button>
        </div>
      </div>
    </div>
  )
}

export default cardItem(CardFavorite)
