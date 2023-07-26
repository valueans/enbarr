import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    login: state => {
      state.isLogin = true;
    },
    logout: state => {
      state.isLogin = false;
    },
  },
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;
