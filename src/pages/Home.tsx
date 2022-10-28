import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '../store'

export default () => {
  const state = useStore()
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          state.set({ token: null })
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
