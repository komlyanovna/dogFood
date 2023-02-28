import {
  useEffect, useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { changeSearchValue } from '../../redux-toolkit/slices/searchSlise/serachSlise'
import { useDebounse } from '../hooks/useDebounce'
import SeachStyle from './style.module.css'

export function Search() {
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const [input, setInput] = useState(() => searchParams.get('query') ?? '')

  const debounceValue = useDebounse(input, 500)

  useEffect(() => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), query: input })
  }, [input])

  useEffect(() => {
    dispatch(changeSearchValue(debounceValue))
  }, [debounceValue])

  const onClickClear = () => {
    setInput('')
  }

  return (
    <div className={SeachStyle.seach}>
      <input
        className={SeachStyle.input}
        placeholder="Поиск"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      {input
      && (
      <svg
        onClick={() => {
          onClickClear()
        }}
        className={SeachStyle.close}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
      </svg>
      )}
    </div>
  )
}
