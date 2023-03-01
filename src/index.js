import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { UsersignUp } from './components/UserSignUp/UserSignUp'
import { TextContainerMain } from './components/TextContainerMain/TextContainerMain'
import { User } from './components/UserSignin/UserSignin'
import { CardItems } from './components/CardItem/CardItems'
import { CardDiteil } from './components/CardDiteil/CardDiteil'
import { BasketProduct } from './components/BasketProducts/BasketProdukts'
import { FormAddProducts } from './components/FormAddProducts/FormAddProducts'
import store, { persistor } from './redux-toolkit/store'
import { FavoriteProducts } from './components/FavoriteProducts/FavoriteProducts'

export const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TextContainerMain />,
      },
      {
        path: '/signup/form',
        element: <UsersignUp />,
      },
      {
        path: '/signIn/form',
        element: <User />,
      },
      {
        path: '/catalog',
        element: <CardItems />,
      },
      {
        path: '/catalog/:id',
        element: <CardDiteil />,
      },
      {
        path: '/basket',
        element: <BasketProduct />,
      },
      {
        path: '/FormAddProducts',
        element: <FormAddProducts />,
      },
      {
        path: '/favorite',
        element: <FavoriteProducts />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
