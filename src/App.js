/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'

export const SearchContext = React.createContext()

function App() {
  const navigate = useNavigate()

  const token = useSelector((store) => store.user)

  useEffect(() => {
    if (!token) {
      navigate('/signin/form')
    }
  }, [token])

  return (
    <div className="container">
      <div className="wrapper">
        <div className="top">
          <Header />
          <Main>
            <div>
              <Outlet token={token} />
            </div>
          </Main>
        </div>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
