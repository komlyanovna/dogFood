/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const favoriteSlace = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (!findItem) {
        state.items.push({ ...action.payload, favorite: true })
      } else {
        findItem.favorite = false
        state.items = state.items.filter((favorite) => favorite !== findItem)
      }
    },

    removeFavorite(state, action) {
      state.items = state.items.filter((favorite) => favorite.id !== action.payload)
    },

    clearItems(state) {
      state.items = []
    },
  },
})

export const {
  addFavorite, removeFavorite, clearItems,
} = favoriteSlace.actions

export default favoriteSlace.reducer
