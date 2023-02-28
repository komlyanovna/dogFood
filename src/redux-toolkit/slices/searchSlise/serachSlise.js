/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
}

export const searchSlise = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchValue(state, action) {
      state.searchValue = action.payload
    },
  },
})

export const { changeSearchValue } = searchSlise.actions

export default searchSlise.reducer
