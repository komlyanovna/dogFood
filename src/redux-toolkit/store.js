/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from './slices/cartSlice/cartSlice'
import favoriteSlace from './slices/favoriteSlace/favoriteSlace'
import serachSlise from './slices/searchSlise/serachSlise'
import userReducer from './slices/userSlice/userSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  favorite: favoriteSlace,
  search: serachSlise,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export default store
