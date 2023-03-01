import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { queryClient } from '../..'
import { REVIEWS } from '../CardDiteil/Reviews'
import { api } from '../Api/Api'
import styleForm from './styles.module.scss'

export function FormAddReviews() {
  const { id } = useParams()

  const addReviews = (values) => api.addReviews(values, id)

  const { mutateAsync } = useMutation({
    mutationFn: (values) => addReviews(values, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS })
    },
    onError: () => toast.error('Ошибка отправки'),
  })

  const review = async (values) => {
    await mutateAsync({ values, id })
    toast.success('Добавлено!')
  }

  return (
    <div className={styleForm.conteiner}>
      <Formik
        initialValues={{
          rating: '',
          text: '',
        }}
        validationSchema={Yup.object({
          rating: Yup.number()
            .required('Поле обязательно к заполнению'),
          text: Yup.string()
            .required('Поле обязательно к заполнению'),
        })}
        onSubmit={(values, { resetForm }) => {
          review(values, id)
          resetForm()
        }}
      >
        <Form className={styleForm.form__inputs}>
          <Field className={styleForm.form__inputs} name="rating" key="rating" type="text" placeholder="Оценка" />
          <ErrorMessage name="rating" />

          <Field className={styleForm.form__inputs} name="text" key="text" type="text" placeholder="Отзыв" />
          <ErrorMessage name="text" />

          <button className={styleForm.btn} type="submit">Добавить отзыв</button>

        </Form>
      </Formik>
    </div>
  )
}
