import React from 'react'
import { View } from 'react-native'

import ImageButton from '../../components/ImageButton'

const google = require('../../assets/google.png')
const apple = require('../../assets/apple.png')
const facebook = require('../../assets/facebook.png')

export default () => {
  return (
    <View style={{ flexGrow: 0.1, height: 30 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 30
        }}
      >
        <ImageButton source={google} label="Google" />
        <ImageButton source={apple} label="Apple" />
        <ImageButton source={facebook} label="Facebook" />
      </View>
    </View>
  )
}
