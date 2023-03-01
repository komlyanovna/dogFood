/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { queryClient } from '../..'
import { api } from '../Api/Api'
import styles from './styles.module.scss'
import { ratingItem } from '../CardItem/utils'
import { Reviews } from './Reviews'
import { FormAddReviews } from '../FormAddReviews/FormAddReviews'
import { Modal } from '../ModalUserDiteil/ModalUserDiteil'
import Card from './Card'
import { FormEditProduct } from '../FormEditProduct/FormEditProduct'

export const PRODUCT_ID = ['PRODUCT_ID']

const getProductQueryId = (id) => [...PRODUCT_ID, id]

export function CardDiteil({ onClickAdd }) {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const notification = () => toast.success('Товар добавлен в корзину!')

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: () => api.deleteProducts(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_ID })
    },
    onError: () => toast.error('Ошибка удаления товара'),
  })

  const deleteProduct = async () => {
    await mutateAsync()
    toast.success('Товар успешно удален')
    navigate('/catalog')
    if (isLoading) {
      return <span>Loading</span>
    }
  }

  const { data, status, error } = useQuery({
    queryKey: getProductQueryId(id),
    queryFn: ({ signal }) => api.cardId(id, signal),
    enabled: !!id,
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
      {data.data ? (
        <>
          <div className={styles.container}>
            <Card
              data={data}
              ratingItem={ratingItem}
              notification={notification}
              onClickAdd={onClickAdd}
              deleteProduct={deleteProduct}
              openModal={openModal}
              id={id}
            />
            <section className={styles.reviews}>
              <FormAddReviews el={id} />
              <Reviews />
            </section>
          </div>
          <hr />
        </>
      ) : null}
      <Link className={styles.link} to="/catalog">Назад в каталог</Link>
      <Modal isOpen={isModalOpen} closeHendler={closeModal}>
        <div className={styles.formEditProduct}>
          <FormEditProduct closeModal={closeModal} />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={solid('xmark')} />
          </button>
        </div>
      </Modal>
    </>
  )
}
