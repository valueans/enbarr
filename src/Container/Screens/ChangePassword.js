import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../utils/GlobalStyle';
import Header from '../../components/Layout/Header';
import Input from '../../components/Input/Input';
import TextField from '../../components/Input/TextField';
import RoundBtn from '../../components/Button/RoundBtn';
import COLORS from '../../utils/colors';
import {changePassword} from '../../APIs/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [loading, setLoading] = useState(false);
  const safeArea = useSafeAreaInsets();

  const handleChangePassword = async () => {
    if (oldPass.length == 0) {
      Alert.alert('Error', 'Please enter your Old Password');
    } else if (password1.length == 0 || password2.length == 0) {
      Alert.alert('Error', 'All Fields are required');
    } else {
      setLoading(true);
      const data = await changePassword(password1, password2, oldPass);
      setLoading(false);
      if (data[0].code == 200) {
        return Alert.alert(data[1].message, '', [
          {
            text: 'ok',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      } else {
        return Alert.alert(data[1].message);
      }
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
            <Header title="Change Password" navigation={navigation} />
            {/* <Input
              title={'Current Password'}
              backgroundColor={COLORS.color11}
              onChangeText={x => setCurrentPassword(x)}
            /> */}
            <Input
              title={'Old Password'}
              backgroundColor={COLORS.color11}
              onChangeText={x => setOldPass(x)}
            />
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
              onPress={handleChangePassword}
              loading={loading}
              disabled={loading}>
              Change Password
            </RoundBtn>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
  },
});
