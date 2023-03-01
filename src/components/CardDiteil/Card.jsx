/* eslint-disable no-shadow */
/* eslint-disable dot-notation */
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cardItem } from '../hooks/cardItem'
import styles from './styles.module.scss'

function Card({
  data,
  ratingItem,
  notification,
  onClickAdd,
  deleteProduct,
  openModal,
  id,
  favoriteEl,
  onClickFavorite,
}) {
  return (
    <div className={styles.conteinerCardId}>
      <img src={data.data.pictures} alt="Изображение" />
      <div className={styles.info}>
        <h4>
          Название:
        </h4>
        <p>
          {data.data.name}
        </p>
        <h4>Цена:</h4>
        <p>
          {data.data.price}
          {' '}
          <FontAwesomeIcon className={styles.rub} icon={solid('ruble-sign')} />
        </p>
        <h4>Товар оценили:</h4>
        <p>
          {data.data.likes.length}
        </p>
      </div>
      <div className={styles.divWr}>
        <div className={styles.containerPopularity}>
          <div className={styles.containerStar}>
            <FontAwesomeIcon className={styles.star} icon={solid('star')} />
            <p className={styles.rating}>
              {ratingItem(data.data.reviews.map((el) => el.rating))}
            </p>
          </div>
          {favoriteEl(data.data['_id']) ? (
            <FontAwesomeIcon
              className={styles.active}
              title="Удалить из избранного"
              icon={solid('heart')}
              onClick={() => {
                onClickFavorite(data.data['_id'])
              }}
            />
          ) : (
            <FontAwesomeIcon
              title="Добавить в избранное"
              className={styles.icon}
              icon={regular('heart')}
              onClick={() => {
                onClickFavorite(data.data['_id'])
              }}
            />
          )}
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.btn}
            onClick={
              () => {
                notification()
                onClickAdd(
                  data.data['_id'],
                  data.data.price,
                  data.data.discount,
                  data.data.pictures,
                  data.data.stock,
                  data.data.name,
                )
              }
            }
          >
            В корзину
          </button>
        </div>
        {data.data.author['_id'] === localStorage.getItem('id') ? (
          <>
            <button
              type="button"
              className={styles.btnDelete}
              onClick={() => {
                deleteProduct(id)
              }}
            >
              Удалить товар
            </button>
            <button
              type="button"
              className={styles.editBtn}
              onClick={openModal}
            >
              Редактировать товар
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default cardItem(Card)
