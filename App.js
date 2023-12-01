import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import RNBootSplash from 'react-native-bootsplash'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AccountStack from './src/Container/AccountStack/AccountStack'
import BottomTab from './src/Container/bottomTab/BottomTab'
import Routing from './src/Container/Routes/Routing'
import { PlatformPay, StripeProvider } from '@stripe/stripe-react-native'
import splash from './src/assets/images/splash.png'
import MysplashScreen from './src/Container/Screens/splashScreen'
import { logout } from './src/redux/login'
import { Platform } from 'react-native'

const App = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(state => state.login)
  const { isremember } = useSelector(state => state.isRemember)
  const [showSpalsh, setShowSplash] = useState(true)

  
  useEffect(() => {
    RNBootSplash.hide({ fade: false, duration: 500 })
    if (Platform.OS == 'ios') {
      setShowSplash(false)
    }
    hideSplash()
    if (!isremember) {
      dispatch(logout())
    }
    //hides the splash screen on app load.
  }, [])

  const hideSplash = async () => {
    setShowSplash(true)
    RNBootSplash.hide({ fade: true, duration: 3000 })
    setTimeout(() => setShowSplash(false), 4000)
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      {showSpalsh ? (
        <MysplashScreen />
      ) : (
        <StripeProvider publishableKey="pk_test_51LzBCTGzsITuEMlQLxfvUEYzYi3eaSiXbutnt6Spa4i6u8Ntp53OwyeSE9QAZqww7VcYedNIdoJLr5hhmv8o8oks006HurLFIl">
          <NavigationContainer>
            {!isLogin ? <AccountStack></AccountStack> : <Routing />}
          </NavigationContainer>
        </StripeProvider>
      )}
    </>
  )
}

const styles = StyleSheet.create({})

export default App
