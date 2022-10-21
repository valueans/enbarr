import React from 'react'
import { View, Text } from 'react-native'

export default () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 0.1
      }}
    >
      <View style={{ backgroundColor: 'white', width: 50, height: 1 }} />
      <Text
        style={{
          fontFamily: 'Poppins',
          fontWeight: '500',
          color: '#fff',
          fontSize: 10,
          textAlign: 'center',
          paddingHorizontal: 12
        }}
      >
        Or use
      </Text>
      <View style={{ backgroundColor: 'white', width: 50, height: 1 }} />
    </View>
  )
}
