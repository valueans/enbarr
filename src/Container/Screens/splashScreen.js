import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Appearance, Animated, useColorScheme } from 'react-native';
import splashImagee from '../../assets/images/splash.png';
import splashImageeWhite from '../../assets/images/home_bg.png';
import arrowLeft from '../../assets/images/arrowLeft.png';
import logoWriting from '../../assets/images/logo_writing.png';
import fonts from '../../utils/fonts';
const MysplashScreen = () => {

  const [opacity, setOpacity] = useState(new Animated.Value(1))
  const [textOpacity, setTextOpacity] = useState(new Animated.Value(0))

  const [show, setShow] = useState(false)

  const theme = useColorScheme()

  onLoad = () => {
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1800,
        useNativeDriver: true,
      }).start();
    }, 1200)
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }, 2000)
  }
  onLoadText = () => {
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 2000)
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        onLoad={onLoad}
        source={theme == 'dark' ? splashImageeWhite : splashImagee}
        resizeMode="contain"
        style={[
          {
            height: '45%', width: '45%',
            opacity: opacity,
            transform: [
              {
                scale: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1],
                })
              },
            ],
          }
        ]}
      />
      <Animated.Text
        onLoad={onLoadText}
        style={[{
          position: 'absolute',
          alignSelf: 'center',
          fontSize: 50,
          fontWeight: '300',
          fontFamily: fonts.sp,
          color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
          opacity: textOpacity,
          transform: [
            {
              scale: textOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1],
              })
            },
          ],
        }]}>
        ENBARR
      </Animated.Text>
    </View>
  );
};

export default MysplashScreen;
