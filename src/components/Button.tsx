import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default ({ text, onPress }: { text: string, onPress?: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        width: 184,
        borderRadius: 30,
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          paddingVertical: 16,
          fontFamily: 'Poppins',
          fontSize: 14,
          fontWeight: '400' // TODO
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
