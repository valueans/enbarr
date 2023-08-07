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
  Alert,
  ScrollView,
  StatusBar,
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
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarIndicator } from 'react-native-indicators';

const Passcode = props => {
  console.log('hiiii', props.route.params);
  const safeArea = useSafeAreaInsets();
  const { source } = props.route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (source == 'FORGOT_PASSWORD') {
      //now should send otp
    }
  }, []);

  const verifyOtpPress = async () => {
    setLoading(true);
    console.log('ssssss', props.route.params.data[1].token);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Token ${props.route.params.data[1].token}`,
    );
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    const data = await fetchWithTimeout(
      `/api/v1/users/verifyotp/?otp=${otp}`,
      requestOptions,
    );
    console.log(data, otp);
    setLoading(false);
    console.log('source', source);
    if (source == 'FORGOT_PASSWORD') {
      if (data[0].code == 200) {
        Alert.alert('Verification code is correct.', '', [
          {
            text: 'Ok',
            onPress: () => {
              props.navigation.navigate('ResetPassword', {
                token: props.route.params.data[1].token,
              });
            },
          },
        ]);
      } else {
        Alert.alert('Please enter a valid otp.');
        setOtp('');
      }
    } else if (source == 'SIGNUP') {
      if (data[0].code == 200) {
        Alert.alert('Verification code is correct.', '', [
          {
            text: 'Ok',
            onPress: async () => {
              await AsyncStorage.setItem('acc', data[1].token);
              // console.log('aaaaaaa');
              dispatch(login());
            },
          },
        ]);
      } else {
        Alert.alert('Please enter a valid otp.');
        setOtp('');
      }
    } else if (source == 'LOGIN') {
      if (data[0].code == 200) {
        dispatch(login());
      } else {
        Alert.alert('Please enter a valid otp.');
        setOtp('');
      }
    }
  };

  const ResendOTP = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Token ${props.route.params.data[1].token}`,
    );
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    const data = await fetchWithTimeout(
      `/api/v1/users/sendotp/`,
      requestOptions,
    );
    console.log(data);
    setLoading(false);
    if (data[0].code == 200) {
      Alert.alert(data[1].message);
      setOtp('');
    } else {
      // Alert.alert('Please enter a valid otp.');
      setOtp('');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'white' }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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
                <Text style={styles.title}>Email Verification</Text>
              </LinearGradient>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.subtitle}>Enter OTP Code sent to mail</Text>
              <OTPInputView
                onCodeChanged={code => {
                  setOtp(code);
                }}
                code={otp}
                pinCount={4}
                style={styles.pins}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
              />
              <TouchableOpacity
                style={[styles.btn]}
                activeOpacity={0.8}
                onPress={verifyOtpPress}>
                {loading ? (
                  <BarIndicator size={20} color="white"></BarIndicator>
                ) : (
                  <Text style={styles.btnText}>Verify</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={ResendOTP} style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.btnText, { color: COLORS.color3 }]}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Passcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  img: {
    width: '100%',
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
    marginTop: 32,
    // marginBottom: 20,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});
