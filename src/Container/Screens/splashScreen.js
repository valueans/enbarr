import React from 'react';
import { View, Image, Text, TouchableOpacity, Appearance } from 'react-native';
import splashImagee from '../../assets/images/splash.png';
import arrowLeft from '../../assets/images/arrowLeft.png';
import logoWriting from '../../assets/images/logo_writing.png';
import fonts from '../../utils/fonts';
const MysplashScreen = () => {
  return (
    <View
      style={{
        marginTop: '100%',
        felx: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Image
        source={splashImagee}
        resizeMode="contain"
        style={{height: 300, width: 234, alignSelf: 'center'}}></Image> */}
      {/* <Image
        source={logoWriting}
        resizeMode="contain"
        style={{width: '50%', alignSelf: 'center'}}
      /> */}
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 50,
          fontWeight: '300',
          fontFamily: fonts.sp,
          color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
        }}>
        ENBARR
      </Text>
    </View>
  );
};

export default MysplashScreen;
