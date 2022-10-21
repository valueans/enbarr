import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStore } from './Store'

import Home from './pages/Home'
import Authentication from './pages/authentication'

const Stack = createNativeStackNavigator()

export default () => {
  const store = useStore()

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!store.token ? (
            <Stack.Screen name="Authentication" component={Authentication} />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
