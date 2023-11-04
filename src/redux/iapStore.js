import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  subscriptions: []
}

export const iapStoreSlice = createSlice({
  name: 'iapStoreSlice',
  initialState,
  reducers: {
    addSubscriptions: (state, action) => {
      state.subscriptions = action.payload
    }
  }
})

export const { addSubscriptions } = iapStoreSlice.actions

export default iapStoreSlice.reducer
