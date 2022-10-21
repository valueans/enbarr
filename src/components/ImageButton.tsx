import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageSourcePropType
} from 'react-native'

export default ({
  source,
  label,
  onPress
}: {
  label: string,
  source: ImageSourcePropType,
  onPress?: () => void
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
        <Image source={source} />
        <Text
          style={{
            paddingTop: 2,
            fontSize: 8,
            color: '#fff',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
