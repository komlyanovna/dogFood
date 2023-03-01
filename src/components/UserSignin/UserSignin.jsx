/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
import { useMutation } from '@tanstack/react-query'
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { queryClient } from '../..'
import { addUser } from '../../redux-toolkit/slices/userSlice/userSlice'
import { api } from '../Api/Api'
import styleForm from './style.module.scss'
import 'react-toastify/dist/ReactToastify.css'

export const SIGNIN_QUERY_KEY = ['SIGNIN_QUERY_KEY']

export function User() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/signIn/form')
  }, [])

  const dispatch = useDispatch()

  const getSignIn = (email, password) => api.signIn(email, password)

  const {
    mutateAsync, isError, isSuccess, isLoading,
  } = useMutation({
    mutationFn: (values) => getSignIn(values.email, values.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGNIN_QUERY_KEY })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    },
  })

  const signIn = async (email, password) => {
    const data = await mutateAsync({ email, password })
    localStorage.setItem('userToken', data.data.token)
    localStorage.setItem('id', data.data.data['_id'])
    dispatch(addUser(data.data.token))
    toast.success('Вы успешно авторизованы!')
    navigate('/catalog')
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Невалидный email адрес')
          .required('Поле обязательно к заполнению'),
        password: Yup.number()
          .required('Поле обязательно к заполнению'),
      })}
      onSubmit={(values) => {
        signIn(values.email, values.password)
      }}
    >
      <Form
        className={styleForm.form__inputs}
      >
        <Field className={styleForm.input} name="email" key="email" type="text" placeholder="Email" />
        <ErrorMessage name="email" />

        <Field className={styleForm.input} name="password" key="password" type="password" placeholder="Пароль" />
        <ErrorMessage name="password" />

        <button type="submit">Вход</button>
        <Link className={styleForm.home} to="/">Назад</Link>
        <Link className={styleForm.home} to="/signup/form">Регистрация</Link>
      </Form>
    </Formik>
  )
}
