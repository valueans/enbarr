import loginReducer from '../redux/login'
import isRememberReducer from '../redux/isRemember'
import userDetailReducer from './userDetail'
import iapStoreReducer from './iapStore'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'

const reducers = combineReducers({
  login: loginReducer,
  userDetail: userDetailReducer,
  isRemember: isRememberReducer,
  iapStore: iapStoreReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['login', 'userDetail', 'isRemember']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
export const persistor = persistStore(store)

export default store
