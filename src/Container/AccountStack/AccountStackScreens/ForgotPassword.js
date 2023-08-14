import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import COLORS, { ColorShade } from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import bg from '../../../assets/images/passcode_bg.png';
import logo from '../../../assets/images/logo_white_sm.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { fetchWithTimeout } from '../../../Shared/fetchData';
import Input from '../../../components/Input/Input';
import { forgetPasswordEmailCheck } from '../../../APIs/api';
import { BarIndicator } from 'react-native-indicators';
const { width, height } = Dimensions.get('screen');

var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const ForgotPassword = props => {
  const safeArea = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const checkEmail = async () => {
    console.log(email);
    setLoading(true);
    const data = await forgetPasswordEmailCheck(email);
    setLoading(false);
    console.log(data)
    if (data[0].code == 200) {
      props.navigation.replace('Passcode', { source: 'FORGOT_PASSWORD', data });
    } else {
      Alert.alert('Try Again', 'User with this email is not found.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: 40,
          android: 0,
        })}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.bgContainer}>
              <Image source={bg} style={styles.img} resizeMode="cover" />
              <LinearGradient
                style={styles.overlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', ColorShade(COLORS.color3, 80)]}>
                <Image
                  source={logo}
                  style={[styles.logo, { top: safeArea.top }]}
                  resizeMode="contain"
                />
                <Text style={styles.title}>Forgot Password</Text>
              </LinearGradient>
            </View>
            <View style={styles.contentContainer}>
              {/* <Input
                title="Enter registered email"
                backgroundColor={COLORS.color11}
                onChangeText={e => setEmail(e)}
                value={email}
                keyboardType={'email-address'}
                style={{marginTop: 32}}></Input> */}

              {Platform.OS == 'ios' ? (
                <Text style={{ marginTop: 20 }}>Email Address</Text>
              ) : null}

              <TextInput
                placeholder="Email Address"
                style={[
                  styles.input,
                  {
                    marginBottom: !emailRegex.test(email) ? 5 : 10,
                    marginTop: 32,
                    height: 55,
                  },
                ]}
                keyboardType="email-address"
                onChangeText={e => setEmail(e)}
                autoCapitalize={'none'}></TextInput>
              {email.length > 0 && !emailRegex.test(email) ? (
                <Text
                  style={{
                    marginBottom: 2,
                    fontFamily: fonts.regular,
                    color: COLORS.red2,
                    fontSize: 12,
                    marginLeft: 16,
                  }}>
                  Invalid Email
                </Text>
              ) : (
                <View style={{ marginBottom: 10 }} />
              )}
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={checkEmail}
                disabled={!emailRegex.test(email)}>
                {loading ? (
                  <BarIndicator size={20} color={COLORS.white}></BarIndicator>
                ) : (
                  <Text style={styles.btnText}>Reset Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgContainer: {
    flex: 1.2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  img: {
    width,
    height: '100%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  logo: {
    width: 40,
    position: 'absolute',
    right: 20,
    height: 100,
    marginTop: Platform.select({
      ios: 20,
      android: 30,
    }),
  },
  title: {
    color: COLORS.white,
    fontFamily: fonts.bold,
    fontSize: 26,
  },
  subtitle: {
    marginTop: 32,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: COLORS.color10,
  },
  pins: {
    height: 60,
    width: '80%',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 48,
  },
  underlineStyleHighLighted: {
    backgroundColor: COLORS.color11,
  },
  underlineStyleBase: {
    width: 55,
    height: 55,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: COLORS.color11,
    fontSize: 20,
    color: COLORS.color3,
    fontFamily: fonts.medium,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.color3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    color: COLORS.color10,
    marginBottom: 20,
    backgroundColor: COLORS.color11,
  },
});
