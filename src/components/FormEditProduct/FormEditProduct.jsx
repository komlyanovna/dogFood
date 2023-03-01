/* eslint-disable consistent-return */
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { queryClient } from '../..'
import { PRODUCT_ID } from '../CardDiteil/CardDiteil'
import { api } from '../Api/Api'
import stylesForm from './styles.module.scss'

export function FormEditProduct({ closeModal }) {
  const { id } = useParams()
  const editProductApi = (values) => api.editProduct(values, id)

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => editProductApi(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_ID })
    },
    onError: () => toast.error('Произошла ошибка редактирования'),
  })

  const editProduct = async (values) => {
    await mutateAsync({ values })
    toast.success('Товар успешно Отредактирован!')
    closeModal()
    if (isLoading) {
      return <span>Loading</span>
    }
  }

  return (
    <div className={stylesForm.containerForm}>
      <Formik
        initialValues={{
          pictures: '',
          price: '',
          discount: '',
          stock: '',
          wight: '',
          description: '',
        }}
        validationSchema={Yup.object({
          pictures: Yup.string()
            .required('Поле обязательно к заполнению'),
          price: Yup.number()
            .required('Поле обязательно к заполнению'),
          discount: Yup.number(),
          stock: Yup.number(),
          wight: Yup.string(),
          description: Yup.string()
            .required('Поле обязательно к заполнению'),
        })}
        onSubmit={(values, { resetForm }) => {
          editProduct(values)
          resetForm()
        }}
      >
        <Form
          className={stylesForm.form__inputs}
        >
          <Field className={stylesForm.input} key="pictures" name="pictures" type="url" placeholder="Изображение" />
          <ErrorMessage name="pictures" />

          <Field className={stylesForm.input} key="price" name="price" type="number" placeholder="Цена" />
          <ErrorMessage name="price" />

          <Field className={stylesForm.input} key="discount" name="discount" type="number" placeholder="Скидка" />
          <ErrorMessage name="discount" />

          <Field className={stylesForm.input} key="stock" name="stock" type="number" placeholder="Количество" />
          <ErrorMessage name="stock" />

          <Field className={stylesForm.input} key="wight" name="wight" type="text" placeholder="Вес" />
          <ErrorMessage name="wight" />

          <Field className={stylesForm.input} key="discription" name="description" type="text" placeholder="Описание" />
          <ErrorMessage name="description" />

          <button
            type="submit"
          >
            Редактировать
          </button>
        </Form>
      </Formik>
    </div>
  )
}
