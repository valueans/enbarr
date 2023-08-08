import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import Background from '../../../components/Layout/Background';
import COLORS from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import { globalStyle } from '../../../utils/GlobalStyle';
import { useSelector } from 'react-redux';
import MainItem from '../../../components/ListItem/MainItem';
import OneSignal from 'react-native-onesignal';
import { list, profile_img } from '../../../utils/data';
import { useFocusEffect } from '@react-navigation/native';
import HomeHeader from '../../../components/Common/HomeHeader';

import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import {
  getAlhorses,
  updateMyDetail,
  getMyDetail,
  searchHorses,
  getOrCreateNewChannel,
  sendPlayerIDToServer,
  getNmberOfNotifications,
} from '../../../APIs/api';
import { BarIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimeFromNow } from '../../../utils/Time';
import { useEffect } from 'react';
import PubNub from 'pubnub';
import * as PubNubKeys from '../Chat/PubNubKeys';

// global.pag = 2;

const HomeScreen = props => {

  const { userDetail } = useSelector(state => state.userDetail);

  console.log('USER DETAILS ', userDetail)

  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`,
    // uuid: `${myDetail?.user?.email}`,
  });

  const { navigation } = props;
  const [listOfHorses, setListOfHorses] = useState([]);
  const [listOfSerachHorses, setListOfSearchHorses] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [myImage, setMyImage] = useState('');
  const [isSeraching, setIsSeraching] = useState(false);
  const [filterItem, setFilterItem] = useState('All');
  const [myDetail, setMydetail] = useState([]);
  const [numberOfNotif, setNumberOfNotif] = useState(0);

  const [page, setPage] = useState(1)

  const goToDetails = item => {
    navigation.navigate('Details', { item, pubnub, myhorse: userDetail.user.id === item.userprofile.id ? true : false });
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchHorses() {
        setIsSeraching(false);
        setIsLoading(true);
        const horses = await getAlhorses(1);

        setIsLoading(false);
        if (filterItem == 'All') {
          setListOfHorses(horses);
        } else if (filterItem == 'Last Day') {
          x = horses.filter(
            (item, index) => TimeFromNow(item.created_at) == 'D',
          );
          setListOfHorses(x);
        } else if (filterItem == 'Week') {
          x = horses.filter(
            (item, index) =>
              TimeFromNow(item.created_at) == 'W' ||
              TimeFromNow(item.created_at) == 'D',
          );
          setListOfHorses(x);
        } else if (filterItem == 'Month') {
          x = horses.filter(
            (item, index) =>
              TimeFromNow(item.created_at) == 'M' ||
              TimeFromNow(item.created_at) == 'W' ||
              TimeFromNow(item.created_at) == 'D',
          );
          setListOfHorses(x);
        }
        const myData = await getMyDetail();
        // console.log('qqqwwww', myData.user.email);
        console.log('qqqqww', myData?.user?.email);
        setMydetail(myData);
        const myBase64ProfileImage = await AsyncStorage.getItem(
          'myProfilePicture',
        );
        // console.log('fuck', myBase64ProfileImage);
        setMyImage(myBase64ProfileImage);
        await getId();

        const notifCount = await getNmberOfNotifications();
        setNumberOfNotif(notifCount[1].count);
        console.log('iouioiu', notifCount[1].count);
      }
      fetchHorses();
    }, []),
  );

  const getId = async () => {
    const data = await OneSignal.getDeviceState();
    console.log('aaa', data);
    const serverResponse = await sendPlayerIDToServer(data?.userId);
  };

  useEffect(() => {
    console.log('changeees');

    async function fetchHorses() {
      setIsSeraching(false);
      setIsLoading(true);
      const horses = await getAlhorses(1);

      setIsLoading(false);
      if (filterItem == 'All') {
        setListOfHorses(horses);
      } else if (filterItem == 'Last Day') {
        x = horses.filter((item, index) => TimeFromNow(item.created_at) == 'D');
        setListOfHorses(x);
      } else if (filterItem == 'Week') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D',
        );
        setListOfHorses(x);
      } else if (filterItem == 'Month') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'M' ||
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D',
        );
        setListOfHorses(x);
      }
    }

    fetchHorses();
  }, [filterItem]);

  const loadMoreHorses = async () => {

    const data = await getAlhorses(page + 1);
    console.log('NEW PAGE NO DATA ', page + 1)
    if (data != '') {
      setPage(page + 1)
      console.log('NEW PAGE WITH DATA ', page + 1, data)
      // setListOfHorses(p => [...p, ...data]);

      if (filterItem == 'All') {
        setListOfHorses(p => [...p, ...data]);
      } else if (filterItem == 'Last Day') {
        x = horses.filter((item, index) => TimeFromNow(item.created_at) == 'D');
        setListOfHorses(p => [...p, ...x]);
      } else if (filterItem == 'Week') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D',
        );
        setListOfHorses(p => [...p, ...x]);
      } else if (filterItem == 'Month') {
        x = horses.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'M' ||
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D',
        );
        setListOfHorses(p => [...p, ...x]);
      }
    }
  };

  const goToChat = async item => {
    console.log('goToChat', item.userprofile.user.id);

    const data = await getOrCreateNewChannel(item.userprofile.user.id);
    if (data.data) {
      navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: pubnub,
      });
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };

  const debounce = func => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const onChnageTextFunc = async e => {
    console.log(e);
    if (e == '') {
      setIsSeraching(false);
      setIsLoading(true);
      const horses = await getAlhorses(1);
      // console.log(horses);
      setIsLoading(false);
      setListOfHorses(horses);
    } else {
      setIsSeraching(true);
      //let call search api
      setIsLoading(true);
      const seachHorse = await searchHorses(e, e);
      console.log('SEARCH RESULTS ', seachHorse);
      setListOfSearchHorses(seachHorse);
      setIsLoading(false);
    }
  };

  const testFunc = () => {
    x = TimeFromNow('2022-12-18T12:50:47.582511Z', false);
    console.log(x);
  };

  const optimizedSerachUsernamefunc = useCallback(debounce(onChnageTextFunc));

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.wrapper]}>
          <HomeHeader
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
                marginBottom: 12,
              }}>
              Search for exact title of horse
            </Text>
            <Text style={styles.listTitle}>Recently added</Text>
            {loading ? (
              <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
            ) : !isSeraching ? (
              <FlatList
                onEndReached={loadMoreHorses}
                onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                data={listOfHorses}
                extraData={listOfHorses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      {(index + 1) % 3 === 0 && (
                        <View
                          key={index}
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <BannerAd
                            size={BannerAdSize.BANNER}
                            // unitId={TestIds.BANNER}
                            unitId={Platform.OS === 'ios' ? 'ca-app-pub-3055000822514370/8330285382' : 'ca-app-pub-3055000822514370/7591918782'}
                          />
                        </View>
                      )}
                      <MainItem
                        item={item}
                        pubnub={pubnub}
                        index={index}
                        onPressDetails={() => goToDetails(item)}
                        onPressMessage={() => goToChat(item)}
                        onPressImage={() => goToDetails(item)}
                        myhorse={userDetail.user.id === item.userprofile.id ? true : false}
                      />
                    </>
                  );
                }}
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
                    item={item}
                    index={index}
                    onPressDetails={() => goToDetails(item)}
                    onPressMessage={() => goToChat(item)}
                  />
                )}
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
  },

  listTitle: {
    color: COLORS.color10,
    fontSize: 15,
    fontFamily: fonts.medium,
    fontWeight: '600',
    marginBottom: 12,
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
