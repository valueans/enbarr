import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  NativeModules,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import COLORS, { ColorShade } from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import { globalStyle } from '../../../utils/GlobalStyle';
import logo from '../../../assets/images/logo_black_sm.png';
import search from '../../../assets/images/search.png';
import ScreenTitle from '../../../components/Text/ScreenTitle';
import { getAllConversations, getMyDetail } from '../../../APIs/api';
import { BarIndicator } from 'react-native-indicators';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen');

import PubNub from 'pubnub';
import * as PubNubKeys from './PubNubKeys';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMAGE = require('../../../assets/images/user.png');

global.pag = 2;

const ChatScreen = props => {
  const { userDetail } = useSelector(state => state.userDetail);
  console.log('wwwwwwewqqqqq', userDetail);
  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`,
  });

  const [myConversations, setMyConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myDetail, setMyDetail] = useState([]);
  const safeArea = useSafeAreaInsets();
  const [isLoadingPic, setIsLoadingPic] = useState(false);

  const [unreadNumList, setUnreadNumList] = useState({});

  const [arrForAllChannels, setArrForAllChannels] = useState([]);

  const [isOnline, setIsOnline] = useState(false);

  // const [pubnub, setpubnub] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchConv() {
        setLoading(true);
        const convs = await getAllConversations(1);
        console.log('chatsssaaaaaaaass', convs);

        setMyConversations(convs);

        channelsArr = [];
        convs.map((item, index) => {
          channelsArr.push(item.channel);
        });
        // //channel-chat-15-13-3
        // pubnub.messageCounts(
        //   {
        //     channels: ['channel-chat-15-13-3'],
        //     timetoken: pubnub.getLastMessageTimestamp('channel-chat-15-13-3'),
        //   },
        //   (status, res) => {
        //     console.log('chatssss', status);
        //     console.log('fffffchats', res);
        //   },
        // );

        setLoading(false);
      }
      pag = 2;
      fetchConv();
      fetchMyDetails();
    }, []),
  );

  const fetchMyDetails = async () => {
    const data = await getMyDetail();
    setMyDetail(data);
    // setMyDetail(data)

    // const pubnub = new PubNub({
    //   subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    //   publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    //   userId: `${data?.user?.email}`,
    // });
    // setpubnub(pubnub);
  };

  const fetchOnlines = async () => {
    pubnub.hereNow(
      {
        channels: ['chats.room1', 'chats.room2'],
        includeState: true,
      },
      function (status, response) {
        console.log(status, response);
      },
    );
  };

  const getMoreConversations = async () => {
    const convs = await getAllConversations(pag);

    setMyConversations(p => [...p, ...convs]);
    pag = pag + 1;
  };

  const isOnLineFunction = async item => {
    // console.log('asdfasdfasdf', item.channel);
    const response = await pubnub.hereNow({
      channels: [item.channel],
      includeUUIDs: true,
      includeState: true,
    });

    // console.log(response);

    if (response.channels[item.channel].occupancy == 0) {
      setIsOnline(false);
    } else {
      console.log('!!!!000000000');
      setIsOnline(true);
    }

    // return true;

    // return x;
  };
  const getUnreadCount = async item => {
    const response = await pubnub.messageCounts({
      channels: [item.channel],
      timetoken: [Math.floor(Date.now() / 1000)],
      includeUUIDs: true,
    });

    // console.log('fuuuckingggggResponse', response);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.circleItemContainer}>
        <View style={{ position: 'relative' }}>
          <Image style={styles.circleItemAvatar} resizeMode={'cover'} />
          <View style={styles.circle} />
        </View>
        <Text style={styles.circleItemText}>John Ugo</Text>
      </TouchableOpacity>
    );
  };
  const chatItem = ({ item, index }) => {
    isOnLineFunction(item);
    getUnreadCount(item);
    // console.log(item.user_two_profile.user);
    return (
      <TouchableHighlight
        underlayColor={COLORS.color11}
        onPress={() => {
          // console.log('Press', myDetail);
          props.navigation.push('Chat', {
            item: item,
            myDetail: myDetail,
            pubnub: pubnub,
          });
        }}>
        <View style={styles.itemContainer}>
          {isOnline ? (
            <View
              style={{
                backgroundColor: 'green',
                position: 'absolute',
                height: 15,
                width: 15,
                borderRadius: 10,
                bottom: 1,
                left: '19%',
                zIndex: 100,
              }}></View>
          ) : null}

          {item?.user_two_profile?.profile_photo ? (
            <View>
              <Image
                onLoad={() => setIsLoadingPic(false)}
                onLoadStart={() => setIsLoadingPic(true)}
                onLoadEnd={() => setIsLoadingPic(false)}
                style={styles.avatar}
                source={{
                  uri: item?.user_two_profile?.profile_photo,
                }}
              />

              {isLoadingPic ? (
                <View
                  style={{
                    // position: 'absolute',

                    marginTop: -40,
                    marginRight: 12,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <BarIndicator size={20} color={COLORS.color14}></BarIndicator>
                </View>
              ) : null}
            </View>
          ) : (
            // <FastImage
            //   style={styles.avatar}
            //   source={{
            //     uri: item.user_two_profile.profile_photo,
            //     // headers: {Authorization: 'someAuthToken'},
            //     priority: FastImage.priority.high,
            //   }}
            //   // resizeMode={FastImage.resizeMode.contain}
            // />
            <Image style={styles.avatar} source={DEFAULT_IMAGE} />
          )}

          <View style={styles.contentContainer}>
            <Text style={styles.username}>
              {item?.user_two_profile?.first_name
                ? item?.user_two_profile.first_name
                : item?.user_two_profile.first_name == null ?
                  item?.user_two_profile.user.username
                  : item?.user_two_profile?.user.email.substring(
                    0,
                    item?.user_two_profile?.user.email.lastIndexOf('@'),
                  )}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {item?.last_message?.Messages}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            {/* <Text style={styles.time}>11:02pm</Text> */}
            {unreadNumList?.channels?.[item?.channel] > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadNumList?.channels?.[item?.channel]}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const onPressTest = async () => {
    // console.log('asdf');
    // NativeModules.ReadImageData.readImage(
    //   'https://ahrefs.com/blog/wp-content/uploads/2021/05/backlinks.png',
    //   base64Image => {
    //     // Do something here.
    //     console.log(base64Image);
    //   },
    // );

    // var x = await AsyncStorage.getItem('myProfilePicture');
    // console.log(x);

    const x = await pubnub.messageCounts(
      myConversations[0]?.user_two_profile.user.email,
    );
    console.log(x);

    // RNFS.readFile(
    //   'https://ahrefs.com/blog/wp-content/uploads/2021/05/backlinks.png',
    //   'base64',
    // ).then(res => {
    //   console.log(res);
    // });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: safeArea.top,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      {/* <Button title="test" onPress={() => onPressTest()}></Button> */}
      <View style={styles.container}>
        <View style={styles.headerSection}>
          {/* <Text style={styles.title}>Message</Text> */}
          <ScreenTitle marginVertical={0}>Message</ScreenTitle>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={search}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput style={styles.input} />
        </View>

        {/* horizontal list */}

        {/* <View>
          <FlatList
            data={[...Array(10)]}
            horizontal={true}
            contentContainerStyle={{
              paddingHorizontal: 21,
              paddingVertical: 12,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View> */}

        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>Recent</Text>
          {loading ? (
            <BarIndicator color="black"></BarIndicator>
          ) : (
            <FlatList
              onEndReached={getMoreConversations}
              onEndReachedThreshold={0.9}
              data={myConversations}
              // data={myConversations}
              // extraData={myConversations}
              showsVerticalScrollIndicator={false}
              renderItem={chatItem}
              contentContainerStyle={{
                // paddingHorizontal: 21,
                paddingBottom: 100,
              }}
              ListEmptyComponent={() => (
                <View style={styles.nothingWrapper}>
                  <Text style={styles.nothingText}>
                    There is nothing to show
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
  },
  logo: {
    width: 19,
    height: 48,
  },
  inputContainer: {
    width: width - 2 * 21,
    height: 60,
    paddingHorizontal: 21,
    backgroundColor: COLORS.color11,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 21,
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  input: {
    paddingHorizontal: 21,
    color: COLORS.color10,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  circleItemContainer: {
    alignItems: 'center',
    position: 'relative',
    marginRight: 10,
  },
  circleItemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.color1,
  },
  circle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 10,
    bottom: 0,
    right: 4,
    backgroundColor: COLORS.green1,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  circleItemText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.color10,
    fontFamily: fonts.regular,
  },
  subtitle: {
    paddingLeft: 21,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
    marginTop: 14,
    marginBottom: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 21,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.color19,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
    fontSize: 15,
  },
  text: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color10,
    fontSize: 12,
  },
  infoContainer: {
    // width: 60,
    alignItems: 'center',
  },
  time: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: COLORS.color13,
  },
  badge: {
    ...globalStyle.center,
    width: 20,
    height: 20,
    backgroundColor: COLORS.red1,
    borderRadius: 10,
    marginTop: 8,
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
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

export default ChatScreen;
