import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type State = {
  token?: string | null,
  set: (partial: Partial<State>) => void
}

const initialState: Partial<State> = {
  token: null
}

export const useStore = create<State>(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        set
      }),
      {
        name: 'storage',
        getStorage: () => AsyncStorage
      }
    )
  )
)
