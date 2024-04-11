import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import OneSignal from 'react-native-onesignal'
import { useSelector } from 'react-redux'
import HomeHeader from '../../../components/Common/HomeHeader'
import Background from '../../../components/Layout/Background'
import MainItem from '../../../components/ListItem/MainItem'
import COLORS from '../../../utils/colors'
import fonts from '../../../utils/fonts'

import PubNub from 'pubnub'
import { useEffect } from 'react'
import * as RNIap from 'react-native-iap'
import { BarIndicator } from 'react-native-indicators'
import {
  appleTransaction,
  getAlhorses,
  getNmberOfNotifications,
  getOrCreateNewChannel,
  searchHorses,
  sendPlayerIDToServer
} from '../../../APIs/api'
import { TimeFromNow } from '../../../utils/Time'
import * as PubNubKeys from '../Chat/PubNubKeys'

// global.pag = 2;

const HomeScreen = props => {
  const isFocused = useIsFocused()

  const { userDetail } = useSelector(state => state.userDetail)

  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`
    // uuid: `${myDetail?.user?.email}`,
  })

  const { navigation } = props
  const [listOfHorses, setListOfHorses] = useState([])
  const [listOfSerachHorses, setListOfSearchHorses] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [myImage, setMyImage] = useState('')
  const [isSeraching, setIsSeraching] = useState(false)
  const [filterItem, setFilterItem] = useState('All')
  const [myDetail, setMydetail] = useState([])
  const [numberOfNotif, setNumberOfNotif] = useState(0)
  const [refreshing, setRefreshing] = useState(false);
  const [totalHorseCount, setTotalHorseCount] = useState(0);

  const [page, setPage] = useState(1)

  const goToDetails = item => {
    navigation.navigate('Details', {
      item,
      pubnub,
      myhorse: userDetail.user.id === item.userprofile.id ? true : false
    })
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('CALL BACK IN FOCUS EFFECT ')
  //     async function fetchHorses() {
  //       setIsSeraching(false);
  //       setIsLoading(true);
  //       const horses = await getAlhorses(1);

  //       setIsLoading(false);
  //       if (filterItem == 'All') {
  //         setListOfHorses(horses);
  //       } else if (filterItem == 'Last Day') {
  //         x = horses.filter(
  //           (item, index) => TimeFromNow(item.created_at) == 'D',
  //         );
  //         setListOfHorses(x);
  //       } else if (filterItem == 'Week') {
  //         x = horses.filter(
  //           (item, index) =>
  //             TimeFromNow(item.created_at) == 'W' ||
  //             TimeFromNow(item.created_at) == 'D',
  //         );
  //         setListOfHorses(x);
  //       } else if (filterItem == 'Month') {
  //         x = horses.filter(
  //           (item, index) =>
  //             TimeFromNow(item.created_at) == 'M' ||
  //             TimeFromNow(item.created_at) == 'W' ||
  //             TimeFromNow(item.created_at) == 'D',
  //         );
  //         setListOfHorses(x);
  //       }
  //       const myData = await getMyDetail();
  //       console.log('PROFILE DATA ', myData);
  //       console.log('qqqqww', myData?.user?.email);
  //       setMydetail(myData);
  //       // const myBase64ProfileImage = await AsyncStorage.getItem(
  //       //   'myProfilePicture',
  //       // );
  //       // console.log('fuck', myBase64ProfileImage);
  //       setMyImage(myData?.profile_photo);
  //       await getId();

  //       const notifCount = await getNmberOfNotifications();
  //       setNumberOfNotif(notifCount[1].count);
  //       console.log('iouioiu', notifCount[1].count);
  //     }
  //     fetchHorses();
  //   }, []),
  // );

  const getId = async () => {
    const data = await OneSignal.getDeviceState()
    console.log('aaa', data)
    const serverResponse = await sendPlayerIDToServer(data?.userId)
  }

  useEffect(() => {

    async function fetchHorses() {
      setIsSeraching(false)
      if(listOfHorses.length==0) setIsLoading(true); 
      const res = await getAlhorses(1)
const horses=res.results
setTotalHorseCount(res.count)
      setIsLoading(false)
      if (filterItem == 'All') {
        setListOfHorses(horses)
      } else if (filterItem == 'Last Day') {
        x = horses.filter((item, index) => TimeFromNow(item.created_at) == 'D')
        setListOfHorses(x)
      } else if (filterItem == 'Week') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        setListOfHorses(x)
      } else if (filterItem == 'Month') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'M' ||
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        setListOfHorses(x)
      }

      const notifCount = await getNmberOfNotifications();
      setNumberOfNotif(notifCount[1].count);

    }

    fetchHorses()
    getPurchaseHistory()
  }, [filterItem, isFocused])

  const getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory();
      console.log('PURCHASE HISRTORY ', purchaseHistory)
      const data = await appleTransaction(purchaseHistory[0])
      console.log('SUCCESS OF API CALL ', data)

    } catch (error) {
      console.log('error ', error)
    }
  }

  const loadMoreHorses = async () => {
    // const data = await getAlhorses(page + 1)
    const res = await getAlhorses(page + 1)
    const data=res?.results

    if (data != '') {
      setPage(page + 1)
      // setListOfHorses(p => [...p, ...data]);
      if (filterItem == 'All') {
        setListOfHorses(p => [...p, ...data])
      } else if (filterItem == 'Last Day') {
        x = data.filter((item, index) => TimeFromNow(item.created_at) == 'D')
        setListOfHorses(p => [...p, ...x])
      } else if (filterItem == 'Week') {
        x = data.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        setListOfHorses(p => [...p, ...x])
      } else if (filterItem == 'Month') {
        x = data.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'M' ||
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        setListOfHorses(p => [...p, ...x])
      }
    }
  }

  const goToChat = async item => {
    console.log('goToChat', item)
    const data = await getOrCreateNewChannel(item.userprofile.user.id,item.id)
    if (data.data) {
      navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: pubnub
      })
    } else {
      Alert.alert('Error', 'Please try again later.')
    }
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
    if (e == '') {
      setIsSeraching(false)
      setIsLoading(true)
      const res = await getAlhorses(1)
      const horses=res.results
      setTotalHorseCount(res.count)
      setIsLoading(false)
      setListOfHorses(horses)
    } else {
      setIsSeraching(true)
      //let call search api
      setIsLoading(true)
      setTotalHorseCount(0)
      // const seachHorse = await searchHorses(e, e)
      const res = await searchHorses(e, e)
     
      const seachHorse=res.results
      setTotalHorseCount(res.count)
      console.log('SEARCH RESULTS ', seachHorse)
      setListOfSearchHorses(seachHorse)
      setIsLoading(false)
    }
  }

  const testFunc = () => {
    x = TimeFromNow('2022-12-18T12:50:47.582511Z', false)
    console.log(x)
  }

  const optimizedSerachUsernamefunc = useCallback(debounce(onChnageTextFunc))

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.wrapper]}>
          <HomeHeader
            showBackButton={false}
            numberOfNotif={numberOfNotif}
            pubnub={pubnub}
            setFilterItem={setFilterItem}
            onChnageTextFunc={optimizedSerachUsernamefunc}
            avatar={myImage}
            navigation={navigation}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                // alignSelf: 'center',
                color: COLORS.color10,
                fontSize: 11,
                fontFamily: fonts.light,
                fontWeight: '100',
                marginBottom: 12
              }}
            >
              Search for exact title of horse
            </Text>
            <Text style={styles.listTitle}>Recently added</Text>
            {loading && (
              <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
            )}
            {!isSeraching ? (
              <FlatList
                initialNumToRender={20}
                onEndReached={loadMoreHorses}
                onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                removeClippedSubviews
                maxToRenderPerBatch={20}
                data={listOfHorses}
                extraData={listOfHorses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <MainItem
                        item={item}
                        pubnub={pubnub}
                        index={index}
                        onPressDetails={() => goToDetails(item)}
                        onPressMessage={() => goToChat(item)}
                        onPressImage={() => goToDetails(item)}
                        myhorse={
                          userDetail.user.id === item.userprofile.id
                        }
                      />
                    </>
                  )
                }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListFooterComponent={() => !!totalHorseCount && totalHorseCount>listOfHorses.length &&<ActivityIndicator  size="large" />}
                ListEmptyComponent={() => (
                  <View style={styles.nothingWrapper}>
                    <Text style={styles.nothingText}>
                      There is nothing to show
                    </Text>
                  </View>
                )}
              />
            ) : (
              <FlatList
                initialNumToRender={20}
                onEndReached={loadMoreHorses}
                onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                data={listOfSerachHorses}
                extraData={listOfSerachHorses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <MainItem
                    pubnub={pubnub}
                    item={item}
                    index={index}
                    onPressDetails={() => goToDetails(item)}
                    onPressMessage={() => goToChat(item)}
                    onPressImage={() => goToDetails(item)}
                    myhorse={
                      userDetail.user.id === item.userprofile.id ? true : false
                    }
                  />
                )}
                ListFooterComponent={() => !!totalHorseCount && totalHorseCount>listOfHorses?.length &&<ActivityIndicator  size="large" />}
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
    </Background>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 16
  },

  listTitle: {
    color: COLORS.color10,
    fontSize: 15,
    fontFamily: fonts.medium,
    fontWeight: '600',
    marginBottom: 12
  },
  nothingText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color17
  },
  nothingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
  }
})
