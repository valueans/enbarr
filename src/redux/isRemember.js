import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isremember: false,
};

export const isrememberSlice = createSlice({
  name: 'Isremember',
  initialState,
  reducers: {
    trueRemember: state => {
      state.isremember = true;
    },
    falseRemember: state => {
      state.isremember = false;
    },
  },
});

export const {trueRemember, falseRemember} = isrememberSlice.actions;

export default isrememberSlice.reducer;
