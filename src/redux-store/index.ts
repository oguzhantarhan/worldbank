// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

// Slice Imports


export const store = configureStore({
  reducer: {

  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
