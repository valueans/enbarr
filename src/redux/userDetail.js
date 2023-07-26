import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDetail: {},
};

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    deleteUserDetail: state => {
      state.userDetail = {};
    },
  },
});

export const {setUserDetail, deleteUserDetail} = userDetailSlice.actions;

export default userDetailSlice.reducer;
