import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRef} from 'react';
import SimpleLayout from '../../components/Layout/SimpleLayout';
import upgradeIcon from '../../assets/images/upgrade.png';
import unsubscribeIcon from '../../assets/images/unsubscribe.png';
import userIcon from '../../assets/images/user_settings.png';
import notifIcon from '../../assets/images/bell_fill.png';
import privacyIcon from '../../assets/images/privacy.png';
import termsIcon from '../../assets/images/terms.png';
import lockIcon from '../../assets/images/lock.png';
import feedbackIcon from '../../assets/images/feedback.png';
import deleteAccountIcon from '../../assets/images/delete_account.png';
import logoutIcon from '../../assets/images/logout.png';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
import Sheet from '../../components/Common/Sheet';
import RoundBtn from '../../components/Button/RoundBtn';
import {globalStyle} from '../../utils/GlobalStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../redux/login';
import {deleteUserDetail} from '../../redux/userDetail';
import {
  deletAccount,
  unsunbscribe,
  updateMyDetail,
  getMyDetail,
} from '../../APIs/api';

const Settings = ({navigation}) => {
  const [isNotification, setIsNotification] = useState(false);
  const [sheetAction, setSheetAction] = useState('');
  const sheetRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getNotificationSettings();
  }, []);

  const getNotificationSettings = async () => {
    const data = await getMyDetail();
    console.log('wwwqwew', data);
    setIsNotification(data?.receive_notifications);
  };

  const safeArea = useSafeAreaInsets();
  const items = [
    {
      icon: upgradeIcon,
      title: 'Upgrade',
      onPress: () => upgrade(),
      customComponent: null,
    },
    {
      icon: unsubscribeIcon,
      title: 'Unsubscribe',
      onPress: () => {
        setSheetAction('Unsubscribe');
        sheetRef.current.snapToIndex(0);
      },
      customComponent: null,
    },
    {
      icon: userIcon,
      title: 'Profile',
      onPress: () => goToPage('MyProfile'),
      customComponent: null,
    },
    {
      icon: notifIcon,
      title: 'Notification',
      onPress: () => {},
      customComponent: (
        <Switch
          value={isNotification}
          onValueChange={e => handleNotification(e)}
          ios_backgroundColor={COLORS.white}
          trackColor={{
            false: Platform.OS == 'ios' ? COLORS.white : COLORS.color14,
            true: COLORS.green1,
          }}
          thumbColor={COLORS.color10}
          style={{
            // backgroundColor: "white",
            borderColor: COLORS.color10,
            borderRadius: 15,
            borderWidth: 1,
          }}></Switch>
      ),
    },
    {
      icon: privacyIcon,
      title: 'Privacy Policy',
      onPress: () => goToPage('Privacy'),
      customComponent: null,
    },
    {
      icon: termsIcon,
      title: 'Terms and Conditions',
      onPress: () => goToPage('Terms'),
      customComponent: null,
    },
    {
      icon: lockIcon,
      title: 'Change Password',
      onPress: () => goToPage('ChangePassword'),
      customComponent: null,
    },
    {
      icon: feedbackIcon,
      title: 'Feedback',
      onPress: () => goToPage('Feedback'),
      customComponent: null,
    },
    {
      icon: deleteAccountIcon,
      title: 'Delete account',
      onPress: () => {
        setSheetAction('Delete this Account');
        sheetRef.current.snapToIndex(0);
      },
      customComponent: null,
    },
    {
      icon: logoutIcon,
      title: 'Logout',
      onPress: () => {
        setSheetAction('Logout');
        sheetRef.current.snapToIndex(0);
      },
      customComponent: null,
    },
  ];

  const goToPage = (name, params = {}) => {
    navigation.navigate(name, params);
  };
  const renderItem = ({item, index}) => {
    const Custom = item.customComponent;
    return (
      <TouchableHighlight onPress={item.onPress} underlayColor={COLORS.color11}>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={item.icon} resizeMode="contain" style={styles.img} />
            <Text
              style={[
                styles.itemText,
                index == items.length - 1 ? styles.logout : {},
              ]}>
              {item.title}
            </Text>
          </View>
          {item.customComponent}
        </View>
      </TouchableHighlight>
    );
  };
  const sheetActionFunction = async type => {
    if (type == 'Delete this Account') {
      await deleteAccount();
    } else if (type == 'Unsubscribe') {
      await unsubscribe();
    } else if (type == 'Logout') {
      await logoutUser();
    }
  };
  const deleteAccount = async () => {
    //type here
    console.log(sheetAction, 'as');
    //here I should call delete account api
    const data = await deletAccount();

    if (data[0].code === 200) {
      dispatch(logout());
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
    sheetRef.current.close();
  };
  const unsubscribe = async () => {
    //type here
    //here I should call unsun api

    const data = await unsunbscribe();
    if (data) {
      sheetRef.current.close();
      Alert.alert('Success', 'Unsubscribed successfully');
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };
  const logoutUser = async () => {
    //type here
    dispatch(deleteUserDetail());
    dispatch(logout());
    await AsyncStorage.setItem('myProfilePicture', '');
    sheetRef.current.close();
  };
  const upgrade = async () => {
    // console.log('upgrade');
    navigation.navigate('Subscriptions');
  };
  const handleNotification = async state => {
    console.log('notif', state);
    setIsNotification(state);
    const data = await updateMyDetail(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      state,
    );
  };

  return (
    <>
      <SimpleLayout
        navigation={navigation}
        title={'Settings'}
        paddingHorizontal={21}
        paddingHorizontalContent={0}>
        <FlatList
          data={items}
          key={'list'}
          keyExtractor={(item, index) => item.title}
          renderItem={renderItem}
          bounces={false}
        />
      </SimpleLayout>
      <Sheet ref={sheetRef} index={-1}>
        <View style={styles.sheetContainer}>
          <Text
            style={
              styles.sheetText
            }>{`Are you sure, you want \nto ${sheetAction}?`}</Text>
          <View style={{flexDirection: 'row', marginTop: 25}}>
            <RoundBtn
              style={{flex: 1, marginRight: 4}}
              onPress={() => {
                sheetActionFunction(sheetAction);
              }}>
              Yes
            </RoundBtn>
            <RoundBtn
              style={{...globalStyle.btnType2, flex: 1, marginLeft: 4}}
              color={COLORS.color10}
              onPress={() => {
                sheetRef.current.close();
              }}>
              No
            </RoundBtn>
          </View>
        </View>
      </Sheet>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  img: {
    width: 21,
    height: 21,
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    color: COLORS.color10,

    fontFamily: Platform.select({
      ios: fonts.regular,
      android: fonts.regular,
    }),
    fontWeight: '500',
  },
  logout: {
    color: COLORS.red3,
  },
  sheetContainer: {
    width: '100%',
    paddingHorizontal: 21,
    paddingBottom: 50,
    paddingTop: 30,
    alignItems: 'center',
  },
  sheetText: {
    color: COLORS.color10,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
