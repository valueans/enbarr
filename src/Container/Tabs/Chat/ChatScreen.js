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
  View,
  ActivityIndicator
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
import arrowLeft from '../../../assets/images/arrowLeft.png';

const { width, height } = Dimensions.get('screen')

import PubNub from 'pubnub'
import ChatRoomCard from '../../../components/chat/ChatRoomCard'
import * as PubNubKeys from './PubNubKeys'

global.pag = 1

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
  const [totalChat, setTotalChat] = useState(0)
  const [searchText, setSearchText] = useState('')
  const safeArea = useSafeAreaInsets()
  const isFocused = useIsFocused()

  useFocusEffect(
    React.useCallback(() => {
      pag = 1;
      fetchConv();
      fetchMyDetails();
    }, []),
  );

  const fetchConv = useCallback(async (search) => {
    setLoading(true)
    const response = await getAllConversations(pag,search)

    const conversation=response.results||[]
   
    setMyConversations(conversation)
    setTotalChat(response.count||0)
    pag = pag + 1
      setLoading(false)
    setRefreshing(false)
  }, [myConversations, loading, refreshing])

  const fetchMyDetails = async () => {
    const data = await getMyDetail()
    setMyDetail(data)
  }


  const getMoreConversations = async () => {
    if((totalChat && !(totalChat > myConversations?.length)) ||
    loading)
  
    return
    const response = await getAllConversations(pag)
    const conversation=response.results||[]
    setMyConversations(p => [...p, ...conversation])
    pag = pag + 1
  }

 

 const debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  const onChnageTextFunc = async e => {
    setSearchText(e)
    pag = 1
    fetchConv(e)
  }


  optimizedSerachUsernamefunc = debounce(onChnageTextFunc)
 
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
          <View style={{flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={() => {
          props.navigation.navigate("Home");
        }}>
        <Image source={arrowLeft} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
          <ScreenTitle marginVertical={0}>Message</ScreenTitle>
          </View>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={search}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput style={styles.input} onChangeText={optimizedSerachUsernamefunc}/>
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
              ListFooterComponent={() =>
                !!totalChat &&             
                totalChat > myConversations?.length && (
                  <ActivityIndicator size="large" />
                )
              }
              ListEmptyComponent={() => (
                
                <View style={styles.nothingWrapper}>
                  <Text style={styles.nothingText}>No recent chats!</Text>
                </View>
              )}
              onRefresh={() => {
                if (!loading) {
                  setRefreshing(true)
                  pag = 1
                  fetchConv(searchText)
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
