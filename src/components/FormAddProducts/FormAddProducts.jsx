/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable function-paren-newline */
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { api } from '../Api/Api'
import { queryClient } from '../..'
import StyleFormAddProducts from './styles.module.scss'

export const ADD_PRODUCT = ['ADD_PRODUCT']

export function FormAddProducts() {
  const addProductByCard = (values) => api.addProducts(values)
  const navigate = useNavigate()

  const {
    mutateAsync, isLoading,
  } = useMutation({
    mutationFn: (values) => addProductByCard(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADD_PRODUCT })
    },
    onError: () => toast.error('Произошла ошибка Добавления'),
  })

  const addProductRenderCard = async (values) => {
    const data = await mutateAsync({ values })
    toast.success('Товар успешно добавлен!')
    navigate(`/catalog/${data.data['_id']}`)
    if (isLoading) {
      return <span>Loading</span>
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          pictures: '',
          name: '',
          price: '',
          discount: '',
          stock: '',
          wight: '',
          description: '',
        }}
        validationSchema={Yup.object({
          pictures: Yup.string()
            .required('Поле обязательно к заполнению'),
          name: Yup.string().max(300, 'Превышено максимальное количество символов')
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
          addProductRenderCard(values)
          resetForm()
        }}
      >
        <Form
          className={StyleFormAddProducts.form__inputs}
        >
          <Field className={StyleFormAddProducts.input} key="pictures" name="pictures" type="url" placeholder="Изображение" />
          <ErrorMessage name="pictures" />

          <Field className={StyleFormAddProducts.input} key="name" name="name" type="text" placeholder="Название" />
          <ErrorMessage name="name" />

          <Field className={StyleFormAddProducts.input} key="price" name="price" type="number" placeholder="Цена" />
          <ErrorMessage name="price" />

          <Field className={StyleFormAddProducts.input} key="discount" name="discount" type="number" placeholder="Скидка" />
          <ErrorMessage name="discount" />

          <Field className={StyleFormAddProducts.input} key="stock" name="stock" type="number" placeholder="Количество" />
          <ErrorMessage name="stock" />

          <Field className={StyleFormAddProducts.input} key="wight" name="wight" type="text" placeholder="Вес" />
          <ErrorMessage name="wight" />

          <Field className={StyleFormAddProducts.input} key="discription" name="description" type="text" placeholder="Описание" />
          <ErrorMessage name="description" />

          <button
            type="submit"
          >
            Добавить продукт
          </button>
          <Link className={StyleFormAddProducts.btn} to="/catalog">Вернуться в каталог</Link>
        </Form>
      </Formik>
    </div>
  )
}
