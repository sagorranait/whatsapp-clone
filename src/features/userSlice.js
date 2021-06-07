import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload.user
    }
  }
});

export const {
  storeUser
} = userSlice.actions
export const getUser = state => state.users.user
export default userSlice.reducer