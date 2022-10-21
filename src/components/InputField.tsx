import React from 'react'
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'

export default ({
  label,
  value,
  onChange,
  keyboardType
}: {
  label: string,
  value: string,
  onChange?: (string: string) => void,
  keyboardType?: KeyboardTypeOptions
}) => {
  return (
    <View style={{ paddingBottom: 18 }}>
      <Text
        style={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: 10,
          color: 'white',
          paddingBottom: 8,
          zIndex: 5
        }}
      >
        {label}
      </Text>
      <View>
        <TextInput
          value={value}
          autoCapitalize="none"
          secureTextEntry={label === 'Password'}
          keyboardType={keyboardType}
          onChangeText={onChange}
          style={{
            borderRadius: 15,
            borderColor: '#D9D9D9',
            borderWidth: 1,
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#fff',
            paddingHorizontal: 12,
            paddingVertical: 14
          }}
        />
      </View>
    </View>
  )
}
