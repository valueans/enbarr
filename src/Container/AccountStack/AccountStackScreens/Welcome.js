import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground,
  NativeModule,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS, { ColorShade } from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');
import ImgToBase64 from 'react-native-image-base64';
import RNFS from 'react-native-fs';
import bg from '../../../assets/images/welcomeBackground.png';
import logo from '../../../assets/images/logo_white_sm.png';
import facebook from '../../../assets/images/facebook.png';
import google from '../../../assets/images/google.png';
import apple from '../../../assets/images/apple.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchWithTimeout } from '../../../Shared/fetchData';
import { BarIndicator } from 'react-native-indicators';
import fonts from '../../../utils/fonts';
// import CheckBox from 'react-native-check-box';
import CheckBox from '../../../components/Button/CheckBox';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/login';
import { trueRemember, falseRemember } from '../../../redux/isRemember';
import { setUserDetail } from '../../../redux/userDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

import jwt_decode from 'jwt-decode';
import auth from '@react-native-firebase/auth';
import { SignUpWithGoogle, SignUpWithApple, SignupWithFacebook } from '../../../APIs/api';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '968378738153-mvtaacnb9rtci0nl2a7dav3klcr7bgfr.apps.googleusercontent.com',
});

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '968378738153-mvtaacnb9rtci0nl2a7dav3klcr7bgfr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '968378738153-mvtaacnb9rtci0nl2a7dav3klcr7bgfr.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const Welcome = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [singUpEmail, setSignUpEmail] = useState('');
  const [signUppass, setsignUpPass] = useState('');
  const [signUpPassConfirm, setSignUpPassConfirm] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass1, setLoginPass1] = useState('');
  const [loginPass2, setLoginPass2] = useState('');
  const [btnSignUpLoading, setBtnSignUpLoading] = useState(false);
  const [btnLoginLoading, setBtnLoginLoading] = useState(false);
  const [isCheckedRemember, setIsCheckedRemember] = useState(false);
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  useEffect(() => {
    // console.log(JSON.parse(bg));
  }, []);
  useEffect(() => {
    // configureAppleSignIn();
    // initializeAppleSignIn();
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    // return appleAuth?.onCredentialRevoked(async () => {
    //   console.warn(
    //     'If this function executes, User Credentials have been Revoked',
    //   );
    // });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  // async function configureAppleSignIn() {
  //   try {
  //     // Configure the library
  //     await appleAuth.configure({
  //       // Request the 'code' response type
  //       responseType: appleAuth.ResponseType.ALL,
  //       // Set any other configuration options here
  //     });
  //   } catch (error) {
  //     console.error('Error configuring Apple Sign In:', error);
  //   }
  // }

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function onAppleButtonPress() {
    console.log('here');

    const appleAuthRequestResponse = await appleAuth?.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // const {identityToken, code} = appleAuthRequestResponse;
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // console.log('000', email, email_verified, is_private_email, sub);

    console.log('main result', appleAuthRequestResponse);

    console.log('main result nonce', appleAuthRequestResponse.nonce);

    const { email, email_verified, is_private_email, sub } = jwt_decode(
      appleAuthRequestResponse.identityToken,
    );

    const data = await SignUpWithApple(
      appleAuthRequestResponse.identityToken,
      appleAuthRequestResponse.authorizationCode,
    );

    console.log('fffff', data, email, appleAuthRequestResponse.identityToken, appleAuthRequestResponse.authorizationCode);

    dispatch(
      setUserDetail({
        token: data[1].key,
        user: { email: email },
        'user-profile': { 'profile-photo': '' },
      }),
    );

    await AsyncStorage.setItem('acc', data[1].key);
    dispatch(login());

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated

    }
  }


  const safeHeight = height - safeArea.bottom - safeArea.top;
  const goToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };
  const RenderStep = step => {
    if (step == 0) {
      return (
        <>
          <Text style={[styles.inputLabel, { marginTop: -8 }]}>Email</Text>
          <TextInput
            style={[styles.input, { marginBottom: !isEmailCorrect ? 5 : 10 }]}
            onChangeText={e => {
              if (!e) {
                setIsEmailCorrect(true);
              }
              setLoginEmail(e);
            }}
            autoCapitalize={'none'}></TextInput>
          {!isEmailCorrect ? (
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
          <Text style={styles.inputLabel}>Password</Text>

          <View
            style={[
              styles.input,
              { flexDirection: 'row', alignItems: 'center' },
            ]}>
            <TextInput
              style={{ flex: 1, color: COLORS.white }}
              onChangeText={e => setLoginPass1(e)}
              autoCapitalize={'none'}
              secureTextEntry={!isShowPassword}></TextInput>
            <TouchableOpacity onPress={() => setIsShowPassword(x => !x)}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 12,
                  color: COLORS.white,
                }}>
                {isShowPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sFooterContainer}>
            <View style={styles.row}>
              <CheckBox
                onChange={x => {
                  setIsCheckedRemember(x);
                }}
                value={isCheckedRemember}
              />
              <Text style={[styles.sText, { marginLeft: 8 }]}>Remember me</Text>
            </View>

            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={goToForgotPassword}>
              <Text style={styles.sText}>Forgot password</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else if (step == 1) {
      return (
        <>
          <Text style={[styles.inputLabel, { marginTop: -23 }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { height: 40, marginBottom: !isEmailCorrect ? 5 : 10 },
            ]}
            onChangeText={e => {
              if (!e) {
                setIsEmailCorrect(true);
              }
              setSignUpEmail(e);
            }}
            autoCapitalize={'none'}></TextInput>
          {!isEmailCorrect ? (
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
          <Text style={styles.inputLabel}>Create password</Text>
          <View
            style={[
              styles.input,
              { flexDirection: 'row', alignItems: 'center', height: 40 },
            ]}>
            <TextInput
              style={{ flex: 1, color: COLORS.white }}
              onChangeText={e => setsignUpPass(e)}
              autoCapitalize={'none'}
              secureTextEntry={!isShowPassword}></TextInput>
            <TouchableOpacity onPress={() => setIsShowPassword(x => !x)}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 12,
                  color: COLORS.white,
                }}>
                {isShowPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirm Password</Text>

          <View
            style={[
              styles.input,
              { flexDirection: 'row', alignItems: 'center', height: 40 },
            ]}>
            <TextInput
              style={{ flex: 1, color: COLORS.white }}
              onChangeText={e => setSignUpPassConfirm(e)}
              autoCapitalize={'none'}
              secureTextEntry={!isShowPassword}></TextInput>
            <TouchableOpacity onPress={() => setIsShowPassword(x => !x)}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 12,
                  color: COLORS.white,
                }}>
                {isShowPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.sFooterContainer, { justifyContent: 'flex-start' }]}>
            <View style={styles.row}>
              <CheckBox
                onChange={e => {
                  setIsCheckedTerms(e);
                }}
                value={isCheckedTerms}
              />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                <Text style={[styles.sText, { marginLeft: 8 }]}>
                  {'I have read '}
                  <Text
                    style={[
                      styles.sText,
                      {
                        marginLeft: 5,
                        paddingLeft: 6,
                        textDecorationLine: 'underline',
                      },
                    ]}
                    onPress={() => {
                      props.navigation.navigate('Terms');
                    }}>
                    {'Terms and Conditions'}
                  </Text>
                </Text>
                <Text style={[styles.sText, { marginLeft: 8 }]}>
                  {'and '}
                  <Text
                    style={[
                      styles.sText,
                      {
                        marginLeft: 5,
                        paddingLeft: 6,
                        textDecorationLine: 'underline',
                      },
                    ]}
                    onPress={() => {
                      props.navigation.navigate('Privacy');
                    }}>
                    {'Privacy Policy'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </>
      );
    }
  };

  const test = () => {
    console.log(isCheckedRemember);
  };

  const buttonPressed = async step => {
    if (step == 0) {
      if (!emailRegex.test(loginEmail)) {
        // Alert.alert('invalid email');
        setIsEmailCorrect(false);
        return;
      } else {
        setIsEmailCorrect(true);
      }
      //login
      console.log(loginEmail, loginPass1);

      var formdata = new FormData();
      formdata.append('username', loginEmail);
      formdata.append('password', loginPass1);
      setBtnLoginLoading(true);
      var requestOptionsLogin = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const data = await fetchWithTimeout(
        '/api/v1/users/login/',
        requestOptionsLogin,
      );
      console.log('ffffffff', data);
      if (data[0].code == 200) {
        console.log('fffffggg', data[1]);
        dispatch(setUserDetail(data[1]));
        // console.log()
        if (data[1]['user-profile'].profile_photo) {
          // const fileReader = new FileReader();

          RNFS.downloadFile({
            fromUrl: data[1]['user-profile'].profile_photo,
            toFile: `${RNFS.DocumentDirectoryPath}/react-native${'tiny'}.png`,
          }).promise.then(r => {
            // this.setState({isDone: true});
            console.log(r);

            RNFS.readFile(
              `${RNFS.DocumentDirectoryPath}/react-native${'tiny'}.png`,
              'base64',
            ).then(res => {
              console.log('qqqqq', res);
              AsyncStorage.setItem('myProfilePicture', res);
            });
          });
        }
        await AsyncStorage.setItem('acc', data[1].token);
        dispatch(login());
        if (isCheckedRemember) {
          dispatch(trueRemember());
        } else {
          dispatch(falseRemember());
        }
      } else {
        Alert.alert('Invalid Credentials');
      }

      setBtnLoginLoading(false);

      console.log(data);
    } else if (step == 1) {
      if (signUppass != signUpPassConfirm) {
        Alert.alert('Error', 'Passwords must match');
        return;
      }
      if (!emailRegex.test(singUpEmail)) {
        // Alert.alert('invalid email');
        setIsEmailCorrect(false);
        return;
      } else {
        setIsEmailCorrect(true);
      }
      if (isCheckedTerms) {
        //sign up
        console.log(singUpEmail, signUppass);
        var formdata = new FormData();
        formdata.append('email', singUpEmail);
        formdata.append('password', signUppass);
        setBtnLoginLoading(true);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };
        const data = await fetchWithTimeout(
          '/api/v1/users/signup/',
          requestOptions,
        );
        console.log(data);
        if (data[0].code == 200) {
          dispatch(setUserDetail(data[1]));
          props.navigation.navigate('Passcode', { source: 'SIGNUP', data });
        } else if (data[0].code == 400 && data[1].email) {
          Alert.alert('This email is already registered with a user');
        }
        setBtnLoginLoading(false);
      } else {
        Alert.alert('Please read Terms and Conditions and Privacy Policy');
      }
    }
  };
  // const googleActionn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('googleeeeee', JSON.stringify(userInfo, null, 2));
  //     response = await SignUpWithGoogle(userInfo.idToken);
  //     console.log('googleeeeee Responseeee', response);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  const onFaceBookButtonPress = async () => {
    console.log('a');
    LoginManager.logInWithPermissions(['public_profile']).then(
      async function (result) {
        console.log('fffffff', result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {

          console.log(
            'Login success with permissions: ' +
            result.grantedPermissions.toString(),
          );
          // const data = await SignupWithFacebook(result.grantedPermissions.toString());
          // dispatch(
          //   setUserDetail({
          //     token: data[1].key,
          //     user: { email: '' },
          //     'user-profile': { 'profile-photo': '' },
          //   }),
          // );

          // await AsyncStorage.setItem('acc', data[1].key);
          // dispatch(login());

        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };


  const googleAction = async () => {
    await GoogleSignin.hasPlayServices();
    eamil = '';
    photo = '';
    GoogleSignin.signIn()
      .then(data => {
        console.log('googleeeeee', JSON.stringify(data, null, 2));
        email = data.user.email;
        photo = data.user.photo;

        const currentUser = GoogleSignin.getTokens().then(async res => {
          // console.log('myTokennn', res); //<-------Get accessToken
          const ress = await SignUpWithGoogle(res.accessToken);
          console.log('myTokennn', ress[1].key);
          // console.log(email);
          dispatch(
            setUserDetail({
              token: ress[1].key,
              user: { email: email },
              'user-profile': { 'profile-photo': photo },
            }),
          );

          if (photo != '') {
            // const fileReader = new FileReader();

            RNFS.downloadFile({
              fromUrl: photo,
              toFile: `${RNFS.DocumentDirectoryPath}/react-native${'tiny'}.png`,
            }).promise.then(r => {
              // this.setState({isDone: true});
              console.log(r);

              RNFS.readFile(
                `${RNFS.DocumentDirectoryPath}/react-native${'tiny'}.png`,
                'base64',
              ).then(res => {
                console.log('qqqqq', res);
                AsyncStorage.setItem('myProfilePicture', res);
              });
            });
          }
          await AsyncStorage.setItem('acc', ress[1].key);
          dispatch(login());
        });
      })
      .then(user => {
        console.log('TEST G LOGIN 1 ' + JSON.stringify(user));
      })
      .catch(error => {
        console.log('.....' + JSON.stringify(error));
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          translucent
          backgroundColor={'transparent'}
        />
        {/* picture */}
        <View style={styles.imgContainer}>
          <Image source={bg} style={styles.bg} resizeMode="cover" />
        </View>
        {/* footer */}
        <View style={styles.footerContainer}></View>
        <LinearGradient
          style={[
            styles.overlay,
            { paddingTop: safeArea.top, paddingBottom: safeArea.bottom },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.65]}
          colors={['transparent', ColorShade(COLORS.color3, 100)]}>
          <View style={[styles.logoContainer]}>
            <Image style={[styles.logo]} source={logo} resizeMode="contain" />
          </View>
          <View style={[styles.contentContainer]}>
            <View style={{ overflow: 'hidden', borderRadius: 30 }}>
              <ImageBackground style={styles.glassBox} blurRadius={30}>
                <View style={styles.tabContainer}>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        {
                          borderBottomWidth: step == 0 ? 3 : 0,
                          paddingBottom: step == 0 ? 0 : 3,
                        },
                      ]}
                      onPress={() => setStep(0)}>
                      <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btn,
                        {
                          borderBottomWidth: step == 1 ? 3 : 0,
                          paddingBottom: step == 1 ? 0 : 3,
                        },
                      ]}
                      onPress={() => setStep(1)}>
                      <Text style={styles.btnText}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1, paddingTop: 32, paddingHorizontal: 16 }}>
                  {RenderStep(step)}
                </View>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => buttonPressed(step)}>
                  {btnLoginLoading ? (
                    <BarIndicator size={20} color="black"></BarIndicator>
                  ) : (
                    <Text style={styles.submitBtnText}>
                      {step == 0 ? 'Login' : 'Sign up'}
                    </Text>
                  )}
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
          <View style={[styles.footerContentContainer]}>
            <View style={[styles.row]}>
              <View style={styles.line} />
              <Text style={styles.oText}>Or Use</Text>
              <View style={styles.line} />
            </View>
            <View
              style={[
                styles.row,
                {
                  paddingTop: 16,
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity style={styles.tBtn} onPress={googleAction}>
                <Image
                  source={google}
                  style={styles.tImg}
                  resizeMode="contain"
                />
                <Text style={styles.tText}>Google</Text>
              </TouchableOpacity>
              {Platform.OS == 'ios' ? (
                <TouchableOpacity
                  style={styles.tBtn}
                  onPress={onAppleButtonPress}>
                  <Image
                    source={apple}
                    style={styles.tImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.tText}>Apple</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.tBtn}
                onPress={onFaceBookButtonPress}>
                <Image
                  source={facebook}
                  style={styles.tImg}
                  resizeMode="contain"
                />
                <Text style={styles.tText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.color3,
  },
  imgContainer: {
    flex: 8,
  },
  footerContainer: {
    flex: 3,
  },
  bg: {
    flex: 1,
    width,
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,

    alignItems: 'center',
  },
  logo: {
    width: 39,
  },
  logoContainer: {
    width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',

    height: '20%',
    paddingTop: Platform.select({
      ios: 60,
      android: 80,
    }),
  },
  contentContainer: {
    marginTop: 30,
    height: '60%',
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContentContainer: {
    height: '20%',
    width,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 16,
  },
  glassBox: {
    width: width * 0.9,
    height: '93%',
    borderRadius: 30,
    backgroundColor: ColorShade(COLORS.white, 15),

    borderColor: ColorShade(COLORS.white, 40),
    borderWidth: 1,

    // padding: 30,
    // alignItems: 'center',
  },
  tabContainer: {
    width: '100%',
    height: '17%',
    backgroundColor: ColorShade(COLORS.black, 40),
    borderRadius: 30,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderBottomColor: ColorShade(COLORS.white, 80),
    borderBottomWidth: 1,
  },
  btn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -1,

    borderBottomColor: COLORS.white,
  },
  btnText: {
    fontFamily: fonts.medium,
    color: COLORS.white,
    fontSize: 12,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 12,
    fontFamily: fonts.medium,
    color: COLORS.white,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    color: COLORS.white,
    marginBottom: 20,
  },
  sFooterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: COLORS.white,
  },
  submitBtn: {
    alignSelf: 'center',
    width: '50%',
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: -25,
    position: 'absolute',
    zIndex: 10,
  },
  submitBtnText: {
    fontFamily: fonts.medium,
    color: COLORS.color10,
    fontSize: 15,
  },
  line: {
    height: 1,
    width: 50,
    backgroundColor: COLORS.white,
  },
  oText: {
    marginHorizontal: 10,
    fontFamily: fonts.regular,
    color: COLORS.white,
    fontSize: 12,
  },
  tBtn: {
    alignItems: 'center',
    marginHorizontal: 32,
  },
  tImg: {
    width: 25,
    height: 25,
  },
  tText: {
    marginTop: 8,
    fontSize: 8,
    fontFamily: fonts.regular,
    color: COLORS.white,
  },
});
