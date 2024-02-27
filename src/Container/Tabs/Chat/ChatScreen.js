import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { getAllConversations, getMyDetail } from '../../../APIs/api'
import logo from '../../../assets/images/logo_black_sm.png'
import search from '../../../assets/images/search.png'
import ScreenTitle from '../../../components/Text/ScreenTitle'
import COLORS from '../../../utils/colors'
import fonts from '../../../utils/fonts'
const { width, height } = Dimensions.get('screen')

import PubNub from 'pubnub'
import ChatRoomCard from '../../../components/chat/ChatRoomCard'
import * as PubNubKeys from './PubNubKeys'

global.pag = 2

const ChatScreen = props => {
  const { userDetail } = useSelector(state => state.userDetail)

  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`
  })

  const [myConversations, setMyConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [myDetail, setMyDetail] = useState([])
  const safeArea = useSafeAreaInsets()
  const isFocused = useIsFocused()

  useFocusEffect(
    React.useCallback(() => {
      pag = 2;
      fetchConv();
      fetchMyDetails();
    }, []),
  );

  const fetchConv = useCallback(async () => {
    console.log('why....');
    const convs = await getAllConversations(1)
    setMyConversations(convs)
    channelsArr = []
    convs.map((item, index) => {
      channelsArr.push(item.channel)
    })
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

    setLoading(false)
    setRefreshing(false)
  }, [myConversations, loading, refreshing])

  const fetchMyDetails = async () => {
    const data = await getMyDetail()
    setMyDetail(data)
  }

  const fetchOnlines = async () => {
    pubnub.hereNow(
      {
        channels: ['chats.room1', 'chats.room2'],
        includeState: true
      },
      function (status, response) {
        console.log(status, response)
      }
    )
  }

  const getMoreConversations = async () => {
    const convs = await getAllConversations(pag)

    setMyConversations(p => [...p, ...convs])
    pag = pag + 1
  }

  const getUnreadCount = async item => {
    const response = await pubnub.messageCounts({
      channels: [item.channel],
      timetoken: [Math.floor(Date.now() / 1000)],
      includeUUIDs: true
    })
  }

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
      myConversations[0]?.user_two_profile.user.email
    )
    console.log(x)

    // RNFS.readFile(
    //   'https://ahrefs.com/blog/wp-content/uploads/2021/05/backlinks.png',
    //   'base64',
    // ).then(res => {
    //   console.log(res);
    // });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: safeArea.top
      }}
    >
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <View style={styles.headerSection}>
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

        <View style={{ flex: 1 }}>
          {myConversations.length > 0 && (
            <Text style={styles.subtitle}>Recent</Text>
          )}
          {loading ? (
            <BarIndicator color="black" size={20} />
          ) : (
            <FlatList
              onEndReached={getMoreConversations}
              onEndReachedThreshold={0.9}
              data={myConversations}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <ChatRoomCard
                    pubnub={pubnub}
                    myDetail={myDetail}
                    item={item}
                    index={index}
                  />
                )
              }}
              contentContainerStyle={{
                // paddingHorizontal: 21,
                paddingBottom: 100
              }}
              ListEmptyComponent={() => (
                <View style={styles.nothingWrapper}>
                  <Text style={styles.nothingText}>No recent chats!</Text>
                </View>
              )}
              onRefresh={() => {
                if (!loading) {
                  setRefreshing(true)
                  fetchConv()
                }
              }}
              refreshing={refreshing}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingBottom: 12
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10
  },
  logo: {
    width: 19,
    height: 48
  },
  inputContainer: {
    width: width - 2 * 21,
    height: 60,
    paddingHorizontal: 21,
    backgroundColor: COLORS.color11,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 21
  },
  searchIcon: {
    width: 22,
    height: 22
  },
  input: {
    paddingHorizontal: 21,
    color: COLORS.color10,
    fontSize: 15,
    fontFamily: fonts.regular
  },
  circleItemContainer: {
    alignItems: 'center',
    position: 'relative',
    marginRight: 10
  },
  circleItemAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.color1
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
    borderColor: COLORS.white
  },
  circleItemText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.color10,
    fontFamily: fonts.regular
  },
  subtitle: {
    paddingLeft: 21,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
    marginTop: 14,
    marginBottom: 14
  },

  nothingText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color17
  },
  nothingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400
  }
})

export default ChatScreen
