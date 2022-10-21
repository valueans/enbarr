import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default ({
  text,
  onPress,
  active
}: {
  text: string,
  active: boolean,
  onPress?: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: active ? 3 : 1,
        borderBottomColor: '#D9D9D9',
        paddingBottom: 12,
        paddingTop: 18
      }}
    >
      <Text
        style={{
          fontFamily: 'Poppins',
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
