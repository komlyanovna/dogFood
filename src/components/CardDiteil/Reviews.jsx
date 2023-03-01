/* eslint-disable dot-notation */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryClient } from '../..'
import { api } from '../Api/Api'
import styles from './styles.module.scss'

export const REVIEWS = ['REVIEWS']
const getReviews = (id) => [...REVIEWS, id]

export function Reviews() {
  const { id } = useParams()

  const deleteReview = (idElem) => {
    api.deleteReview(id, idElem)
  }

  const {
    mutateAsync,
  } = useMutation({
    mutationFn: (idEl) => {
      deleteReview(idEl)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS })
    },
    onError: () => toast.error('Ошибка удаления'),
  })

  const deleteReviewId = async (idAuthor) => {
    await mutateAsync(idAuthor)
    toast.success('Ваш отзыв удален')
  }

  // if (isSuccess) {
  //   toast.success('Ваш отзыв удален')
  // }

  const { data, status, error } = useQuery({
    queryKey: getReviews(id),
    queryFn: ({ signal }) => api.reviews(id, signal),
  })
  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  return (
    <>
      {data.data.map((elem) => (
        <div className={styles.containerId} key={elem['_id']}>
          <h5>
            Пользователь:
            {' '}
            {elem.author.name}
          </h5>
          <hr />
          <p>
            Оценка:
            {' '}
            <FontAwesomeIcon className={styles.star} icon={solid('star')} />
            {elem.rating}
          </p>
          <hr />
          <h5>
            Отзыв:
            {' '}
          </h5>
          <p>{elem.text}</p>
          {elem.author['_id'] === localStorage.getItem('id') ? (
            <button
              className={styles.trash}
              type="button"
              onClick={() => {
                deleteReviewId(elem['_id'])
              }}
            >
              <FontAwesomeIcon icon={solid('trash')} />
            </button>
          ) : null}
        </div>
      ))}
    </>
  )
}
