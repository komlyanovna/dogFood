import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { Logo } from '../Logo/Logo'
import { NavigationHeader } from '../NavigationHeader/NavigationHeader'
import { Search } from '../Search/Search'
import StyleHeader from './styles.module.css'

export function Header() {
  const [nav, setNav] = useState(false)

  const navigate = useNavigate(false)
  const output = () => {
    alert('Вы действительно хотите покинуть личный кабинет?')
    localStorage.removeItem('userToken')
    localStorage.removeItem('persist:root')
    localStorage.removeItem('id')
    navigate('/')
  }

  return (
    <header>
      <div className={StyleHeader.header}>
        <div className={StyleHeader.logo}>
          <Logo />
        </div>
        <div>
          <ul
            className={
              nav ? [StyleHeader.navContainer, StyleHeader.active].join(' ')
                : [StyleHeader.navContainer]
            }
          >
            <li><Search /></li>
            <li><NavigationHeader nav={nav} setNav={setNav} /></li>
            <div className={StyleHeader.LinkContainer}>
              <li>
                <Link
                  className={StyleHeader.Link}
                  to="/catalog"
                  onClick={() => setNav(!nav)}
                >
                  Главная
                </Link>
              </li>
              {localStorage.getItem('userToken') ? <button className={StyleHeader.outup} onClick={() => output()} type="button">Выйти</button> : (
                <>
                  <li>
                    <Link
                      className={StyleHeader.Link}
                      to="/signIn/form"
                      onClick={() => setNav(!nav)}
                    >
                      Авторизация
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={StyleHeader.Link}
                      to="/signup/form"
                      onClick={() => setNav(!nav)}
                    >
                      Регистрация
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
          <div
            className={StyleHeader.burger}
            onClick={() => setNav(!nav)}
          >
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
        </div>
      </div>
    </header>
  )
}
