import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useState, useEffect } from 'react';
import SimpleLayout from '../../components/Layout/SimpleLayout';
import { globalStyle } from '../../utils/GlobalStyle';
import fonts from '../../utils/fonts';
import COLORS from '../../utils/colors';
import { profile_img } from '../../utils/data';
import { getAllNotifications, realAllnotifications } from '../../APIs/api';
import optionIcon from '../../assets/images/option.png';
import { BarIndicator } from 'react-native-indicators';
const DEFAULT_IMAGE = require('../../assets/images/img_default_pic.png');
import PubNub from 'pubnub';
import * as PubNubKeys from '../Tabs/Chat/PubNubKeys';
import { setNotificationCount } from '../../redux/numberOfNotifications';
import { useDispatch } from 'react-redux';

global.pag = 2;

const Notification = ({ navigation }) => {
  const [notification, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()

  useEffect(() => {
    pag = 2;
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    const data = await getAllNotifications(1);
    // console.log('bbb', data[1]);
    console.log(data.length);
    setNotifications(data);
    setLoading(false);
  };

  const getMoreNotifications = async () => {
    const data = await getAllNotifications(pag);
    console.log(pag);
    setNotifications(p => [...p, ...data]);
    pag = pag + 1;
  };

  const readAllPress = async () => {
    const data = await realAllnotifications();
    if (data) {
      dispatch(setNotificationCount(0))
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };
  const onPressNotification = async item => {
    console.log(item?.user_profile?.user?.email);
    console.log(item);
    // console.log(item.user_one_profile.user);
    const pubnub = new PubNub({
      subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
      publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
      userId: `${item.user_profile.user.email}`,
    });

    if (item.type == 'MESSAGE') {
      // console.log(item.user_profile);
      navigation.push('Chat', {
        item: {
          ...item,
          user_one_profile: item?.user_profile,
          channel: item?.channel_id,
        },
        myDetail: item?.user_profile,
        pubnub: pubnub,
      });
    } else if (item.type == 'HORSE LIKE') {
      navigation.navigate('Horses', { from: 'notif' });
    }

    //myDetail:item.user_profile
    //pubnub: should create

    // props.navigation.push('Chat', {
    //   item: item,
    //   myDetail: myDetail,
    //   pubnub: pubnub,
    // });
  };

  const renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => onPressNotification(item)}>
        {item.user_two_profile?.profile_photo ? (
          <FastImage
            source={{ uri: item.user_two_profile.profile_photo }}
            resizeMode="cover"
            style={styles.avatar}
          />
        ) : (
          <Image
            source={DEFAULT_IMAGE}
            resizeMode="cover"
            style={styles.avatar1}></Image>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.itemText}>{item.description}</Text>
        </View>

        {/* <TouchableOpacity style={styles.itemBtn}>
          <Image
            source={optionIcon}
            style={styles.itemIcon}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  return (
    <SimpleLayout navigation={navigation} title="Notification">
      <View
        style={[
          globalStyle.row,
          { justifyContent: 'space-between', paddingVertical: 12 },
        ]}>
        <Text style={styles.title}>All notifications</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => readAllPress()}>
          <Text style={styles.btnText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <BarIndicator color="black"></BarIndicator>
        ) : (
          <FlatList
            onEndReached={getMoreNotifications}
            onEndReachedThreshold={0.7}
            data={notification}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.nothingWrapper}>
                <Text style={styles.nothingText}>There is nothing to show</Text>
              </View>
            )}
          />
        )}
      </View>
    </SimpleLayout>
  );
};

export default Notification;

const styles = StyleSheet.create({
  title: {
    color: COLORS.color10,
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '500',
  },
  btnText: {
    color: '#8f8f8f',
    fontSize: 12,
    fontFamily: fonts.regular,
    fontWeight: '500',
  },
  item: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    width: 25,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 16,
  },
  avatar1: {
    width: 45,
    height: 45,
    borderRadius: 40,
    marginRight: 16,
  },
  itemText: {
    fontFamily: fonts.regular,
    fontWeight: '500',
    fontSize: 12,
    color: COLORS.color10,
  },
  itemBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nothingText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color17,
  },
  nothingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
});
