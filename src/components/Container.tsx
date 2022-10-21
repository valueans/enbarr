import React from 'react'
import { ImageBackground, View, ViewProps } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {  SafeAreaView } from 'react-native-safe-area-context'

const background = require('../assets/background.png')

// TODO get a higher picture
export default (props: ViewProps) => (
  <View style={{ flex: 1, backgroundColor: '#302F32' }}>
    <ImageBackground
      source={background}
      style={{ flex: 1, zIndex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.6 }}
        colors={['rgba(255, 255, 255, 0)', '#302F32']}
        style={{ flex: 1, zIndex: 2 }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            width: 388
          }}
          {...props}
        />
      </LinearGradient>
    </ImageBackground>
  </View>
)
