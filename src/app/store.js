import { configureStore } from '@reduxjs/toolkit'
import getUser from '../features/userSlice'

export const store = configureStore({
  reducer: {
    users: getUser
  },
});
