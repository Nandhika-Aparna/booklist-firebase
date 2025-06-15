import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser:null
  },
  reducers: {
    setuser: (users, action) => {
        users.currentUser= action.payload;
    }
  }
})

export const { setuser } = usersSlice.actions;

export const selectusers= state => state.users;

export default usersSlice.reducer;