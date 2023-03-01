/* eslint-disable dot-notation */
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyleCardItem from './style.module.scss'
import { ratingItem, sale } from './utils'
import { cardItem } from '../hooks/cardItem'

function Card({
  el,
  notification,
  onClickAdd,
  navigate,
  favoriteEl,
  onClickFavorite,
}) {
  return (
    <div className={StyleCardItem.cardItem} key={el['_id']} data-id={(el['_id'])}>
      {favoriteEl(el['_id']) ? (
        <FontAwesomeIcon
          title="Удалить из избранного"
          className={StyleCardItem.active}
          icon={solid('heart')}
          onClick={() => {
            onClickFavorite(el['_id'])
          }}
        />
      ) : (
        <FontAwesomeIcon
          title="Добавить в избранное"
          className={StyleCardItem.icon}
          icon={regular('heart')}
          onClick={() => {
            onClickFavorite(el['_id'])
          }}
        />
      )}

      <p className={StyleCardItem.likes}>{el.likes.length}</p>
      <div className={StyleCardItem.containerImage}>
        <img className={StyleCardItem.image} src={el.pictures} alt="Фото" />
      </div>
      <hr />
      <h3>{el.name}</h3>
      <hr />
      {el.discount ? (
        <>
          <p>
            {sale(el.price, el.discount)}
            <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
          </p>
          <p className={StyleCardItem.priceActive}>
            {el.price}
            {' '}
            <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
          </p>
          <p className={StyleCardItem.discount}>
            -
            {el.discount}
            %
          </p>
        </>
      ) : (
        <p className={StyleCardItem.price}>
          {el.price}
          {' '}
          <FontAwesomeIcon className={StyleCardItem.rub} icon={solid('ruble-sign')} />
        </p>
      )}
      <hr />
      <FontAwesomeIcon className={StyleCardItem.star} icon={solid('star')} />
      <p>
        {
        ratingItem(el.reviews.map((item) => item.rating))
        }
      </p>
      <hr />
      <p>{el.wight}</p>
      <hr />
      <button
        className={StyleCardItem.btn}
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
        className={StyleCardItem.link}
        onClick={() => {
          const id = el['_id']
          navigate(`/catalog/${id}`)
        }}
      >
        Подробнее о товаре
      </button>
    </div>
  )
}

export default cardItem(Card)
