import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import Separator from './Separator'
import Footer from './Footer'
import Form from './Form'
import Container from '../../components/Container'

const logo = require('../../assets/logo.png')

export default () => {
  return (
    <Container>
      <View style={{ paddingBottom: 16 }}>
        <Image source={logo} style={{ alignSelf: 'flex-end' }} />
      </View>
      <Form />
      <Separator />
      <Footer />
    </Container>
  )
}
