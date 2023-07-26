import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../../utils/GlobalStyle';
import Header from '../../../components/Layout/Header';
import Input from '../../../components/Input/Input';
import TextField from '../../../components/Input/TextField';
import RoundBtn from '../../../components/Button/RoundBtn';
import COLORS from '../../../utils/colors';
import {ChangePassword, resetPassword} from '../../../APIs/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ResetPassword = ({navigation, route}) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [loading, setLoading] = useState(false);
  const safeArea = useSafeAreaInsets();
  const {token} = route.params;

  const HandleResetPassword = async () => {
    setLoading(true);
    console.log(password1, password2, token);
    const data = await resetPassword(password1, password2, token);
    console.log('data', data);
    setLoading(false);
    if (data[0].code == 200) {
      return Alert.alert('password changed', '', [
        {
          text: 'ok',
          onPress: () => {
            navigation.replace('Welcome');
          },
        },
      ]);
    } else {
      return Alert.alert('Error', 'Please try again');
    }
  };
  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: COLORS.white, paddingTop: safeArea.top},
      ]}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}>
        <View style={globalStyle.innerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header title="Reset Password" navigation={navigation} />

            <Input
              title={'New Password'}
              backgroundColor={COLORS.color11}
              onChangeText={x => setPassword1(x)}
            />
            <Input
              title={'Confirm Password'}
              backgroundColor={COLORS.color11}
              onChangeText={x => setPassword2(x)}
            />

            <RoundBtn
              style={styles.btn}
              onPress={HandleResetPassword}
              loading={loading}
              disabled={loading}>
              Reset Password
            </RoundBtn>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
  },
});
