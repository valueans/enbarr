import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default ({ text, onPress }: { text: string, onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          fontFamily: 'poppins',
          fontWeight: 'bold',
          fontSize: 10,
          color: '#fff'
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
