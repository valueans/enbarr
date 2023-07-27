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
import {sendFeedBack} from '../../APIs/api';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Feedback = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const safeArea = useSafeAreaInsets();
  const sendFeedbackToserver = async () => {
    const data = await sendFeedBack(email, message);
    if (data) {
      Alert.alert('Feedback sent successfully.');
    } else {
      Alert.alert('Please try again.');
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
            <Header title="Support/Send Feedback" navigation={navigation} />
            <Input
              title={'Email address'}
              backgroundColor={COLORS.color11}
              onChangeText={e => setEmail(e)}
            />
            <TextField
              onChangeText={e => setMessage(e)}
              title={'Message'}
              backgroundColor={COLORS.color11}
            />

            <RoundBtn style={styles.btn} onPress={() => sendFeedbackToserver()}>
              Submit
            </RoundBtn>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
  },
});
