import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  numberOfNotifications: 0,
};

export const numberOfNotifications = createSlice({
  name: 'numberOfNotifications',
  initialState,
  reducers: {
    setNotificationCount: (state, action) => {
      state.numberOfNotifications = action.payload;
    },
    deleteNotificationCount: state => {
      state.numberOfNotifications = 0;
    },
  },
});

export const {setNotificationCount, deleteNotificationCount} = numberOfNotifications.actions;

export default numberOfNotifications.reducer;
