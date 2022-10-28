import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { BlurView } from '@react-native-community/blur'
import TabButton from '../../components/TabButton'
import TextButton from '../../components/TextButton'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import log from '../../log'
import { useMutation } from '@tanstack/react-query'
import API from '../../api'
import { useStore } from '../../store'
import { LoginRequest, LoginResponse, RegisterRequest } from '../../types'

enum Tab {
  Login,
  Register
}

const styles = StyleSheet.create({
  inputFieldRow: {
    paddingHorizontal: 20
  }
})

export default () => {
  const state = useStore()
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginQuery = useMutation<LoginResponse, unknown, LoginRequest, unknown>(
    API.shared().login
  )
  const registerQuery = useMutation<
    LoginResponse,
    unknown,
    RegisterRequest,
    unknown
  >(API.shared().register)

  const login = async () => {
    const q =
      activeTab === Tab.Login
        ? loginQuery.mutateAsync({ username: email, password })
        : registerQuery.mutateAsync({ email, password })
    const data = await q
    log.info(`user ${data.user.id} is logged in`)
    state.set(data)
  }

  return (
    <>
      <BlurView
        blurType="light"
        blurAmount={6}
        style={{
          flexDirection: 'column',
          alignSelf: 'center',
          borderWidth: 1,
          flex: 0.6,
          paddingBottom: 126,
          borderRadius: 26,
          borderColor: '#rgba(255, 255, 255, 0.4)',
          overflow: 'hidden',
          width: 355,
          backgroundColor: '#rgba(0, 0, 0, 0.4)'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            zIndex: 4,
            backgroundColor: 'rgba(0, 0, 0, .4)',
            borderRadius: 26
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              zIndex: 4,
              paddingHorizontal: 45,
              paddingBottom: 15
            }}
          >
            <TabButton
              text="Sign up"
              active={activeTab === Tab.Register}
              onPress={() => setActiveTab(Tab.Register)}
            />
            <TabButton
              text="Login"
              active={activeTab === Tab.Login}
              onPress={() => setActiveTab(Tab.Login)}
            />
          </View>
        </View>
        <View style={{ paddingTop: 28, zIndex: 4 }}>
          <View style={styles.inputFieldRow}>
            <InputField
              label="Email"
              value={email}
              onChange={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputFieldRow}>
            <InputField
              label="Password"
              value={password}
              onChange={setPassword}
            />
          </View>
          <View style={{ alignSelf: 'flex-end', paddingHorizontal: 24 }}>
            <TextButton text="Forgot Password" onPress={() => { }} />
          </View>
        </View>
      </BlurView>
      <View style={{ marginTop: -44, alignSelf: 'center' }}>
        <Button text="Login" onPress={login} />
      </View>
    </>
  )
}
