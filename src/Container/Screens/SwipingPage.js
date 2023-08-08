import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import React, { useState, useRef, useEffect } from 'react';
import { globalStyle } from '../../utils/GlobalStyle';
import COLORS from '../../utils/colors';
import CustomTab from '../../components/Layout/CustomTab';
import logoWriting from '../../assets/images/logo_writing.png';
import like from '../../assets/images/like.png';
import dislike from '../../assets/images/dislike.png';
import chev from '../../assets/images/chev_up.png';
import fonts from '../../utils/fonts';
import Swiper from 'react-native-deck-swiper';
import MainItem from '../../components/ListItem/MainItem';
import Geolocation from 'react-native-geolocation-service';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import horseImg from '../../assets/images/horseMap.png';
import backIcon from '../../assets/images/arrowLeft.png';
import {
  getAlhorses,
  likeAHorse,
  disLikeAHorse,
  getSavedSearchDetal,
  resultUserSearchBuyer,
  getAllHorseLatandLong,
  getOrCreateNewChannel,
} from '../../APIs/api';
import PubNub from 'pubnub';
import * as PubNubKeys from '../Tabs/Chat/PubNubKeys';
const [allHorseLatandLon, setAllHorseLatandLon] = useState([]);
import { BarIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen');
global.pag = 2;

const SwipingPage = props => {

  const swiperRef = useRef(null);
  const mapRef = useRef(null);
  const [horsesList, setHorsesList] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const [allHorseLatandLon, setAllHorseLatandLon] = useState([]);
  //swipper or map
  const [whichPage, setWichPage] = useState('swipper');

  const [detailLat, setDetailLat] = useState(props.route.params.myLat);
  const [detailLng, setDetailLng] = useState(props.route.params.myLong);

  console.log('%%%#### THIS IS LAT ', detailLat, detailLng)

  const { userDetail } = useSelector(state => state.userDetail);


  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`,
  });

  useEffect(() => {
    pag = 2;
    getDetail();
    getHorses();
    getAllHorseLatituteandLongitute();
    console.log(
      'ewerewrwer',
      props.route.params.myLat,
      props.route.params.myLong,
      props.route.params.pubnub,
    );

    return () => { };
  }, []);
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('always');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('We need your location');
    }

    if (status === 'disabled') {
      Alert.alert('We need your location');
    }

    return false;
  };
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getAllHorseLatituteandLongitute = async () => {
    const data = await getAllHorseLatandLong();

    if (data[0].code == 200) {
      setAllHorseLatandLon(data[1]);
    } else {
      setAllHorseLatandLon([]);
    }
  };

  const getDetail = async () => {
    const data = await getSavedSearchDetal();

    if (data[0].code == 200) {
      if (data[1][0].lat && data[1][0].lng) {
        setDetailLat(data[1][0]?.lat);
        setDetailLng(data[1][0]?.lng);
      }
    }
  };

  const getHorses = async () => {
    setLoading(true);
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {
        const horses = await resultUserSearchBuyer(
          1,
          position.coords.latitude,
          position.coords.longitude,
        );

        setLoading(false);
        setHorsesList(horses);
      });
    } else {
      Geolocation.getCurrentPosition(async position => {
        const horses = await resultUserSearchBuyer(1, 0, 0);

        setLoading(false);
        setHorsesList(horses);
      });
    }
  };
  const renderMarkers = () => {
    return allHorseLatandLon.map((item, index) => (
      <Marker
        key={index}
        onPress={() =>
          props.navigation.navigate('Details', {
            from: 'map',
            id: item.id,
            item: {
              id: item.id,
              user_location: {
                coordinates: [item.lng, item.lat],
              },
            },
            pubnub: pubnub,
          })
        }
        coordinate={{
          latitude: item.lat + Math.random() * 0.0002 - 0.0001,
          longitude: item.lng - Math.random() * 0.0002 - 0.0001,
        }}>
        <Image
          source={horseImg}
          resizeMode="contain"
          style={{ width: 40, height: 40, borderRadius: 20 }}></Image>
      </Marker>
    ));
  };
  const loadMoreHorse = async () => {
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {
        const data = await resultUserSearchBuyer(
          pag,
          position.coords.latitude,
          position.coords.longitude,
        );
        pag = pag + 1;
        setHorsesList(p => [...p, ...data]);
      });
    } else {
      Geolocation.getCurrentPosition(async position => {
        const data = await resultUserSearchBuyer(
          pag,
          position.coords.latitude,
          position.coords.longitude,
        );
        pag = pag + 1;
        setHorsesList(p => [...p, ...data]);
      });
    }
  };

  const pressDislike = async () => {
    swiperRef?.current?.swipeLeft();
    await disLikeAHorse(horsesList[cardIndex]?.id);
  };

  const pressLike = async () => {
    swiperRef?.current?.swipeRight();
    await likeAHorse(horsesList[cardIndex]?.id);
  };
  const goToDetails = item => {
    if (item) {
      // props.navigation.navigate('Details', {
      //   item,
      //   pubnub: pubnub
      // });
      props.navigation.navigate('Details', { item, pubnub: pubnub, myhorse: userDetail.user.id === item.userprofile.id ? true : false });

    }
  };

  const goToChat = async item => {
    console.log(item);
    const data = await getOrCreateNewChannel(item.userprofile.user.id);
    if (data.data) {
      console.log('THIS IS DATA FROM ', data);
      props.navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: pubnub,
      });
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };

  const onSwipeRight = async index => {
    console.log('onSwipeRight', index, horsesList[index].id);
    await likeAHorse(horsesList[index].id);
  };

  const onSwipeLeft = async index => {
    await disLikeAHorse(horsesList[index].id);
  };

  const clickonMarkers = (cluster, markers) => {
    // setArrPeople([]);
    var arr = [];
    markers.map((eachmarker, index) => {
      console.log('tttttrrrr', eachmarker);
      console.log(eachmarker.properties.index);
      console.log(allHorseLatandLon[eachmarker.properties.index]);
      // obj = {
      //   username: eachmarker.properties.markerUsername,
      //   pic: eachmarker.properties.markerPicture,
      //   index,
      //   category: eachmarker.properties.category,
      // };
      // arr.push(obj);
    });

    // setArrPeople(arr);

    // peopleRef.current.present();
  };

  return (
    <SafeAreaView
      style={[globalStyle.container, { backgroundColor: COLORS.white }]}>
      <View style={globalStyle.innerContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Image
              source={logoWriting}
              resizeMode="contain"
              style={styles.logo}
            />
            <TouchableOpacity
              style={{ position: 'absolute', top: 30, left: 8 }}
              onPress={() => props.navigation.goBack()}>
              <Image
                source={backIcon}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setWichPage('swipper')}
              style={{
                borderRadius: 10,
                backgroundColor: whichPage == 'swipper' ? 'black' : 'grey',
                height: 40,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white' }}>Match</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWichPage('map')}
              style={{
                borderRadius: 10,
                backgroundColor: whichPage == 'swipper' ? 'grey' : 'black',
                height: 40,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: 'white' }}>See on Map</Text>
            </TouchableOpacity>
          </View>
          {whichPage == 'swipper' ? (
            <View
              style={styles.content}
              onLayout={({ nativeEvent }) =>
                setCardHeight(nativeEvent.layout.height - 10)
              }>
              {loading ? (
                <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
              ) : horsesList.length == 0 ? (
                <Text style={{ alignSelf: 'center' }}>
                  There is not any horse.
                </Text>
              ) : (
                <Swiper
                  ref={swiperRef}
                  cards={horsesList}
                  renderCard={card =>
                    (card && (
                      <View
                        style={{ width: width - 32, height: cardHeight - 10 }}>
                        <MainItem
                          item={card}
                          onPressDetails={() => goToDetails(card)}
                          onPressMessage={() => {
                            // console.log('GO TO CHAT ', card)
                            goToChat(card)
                          }}
                          myhorse={userDetail.user.id === item.userprofile.id ? true : false}
                        />
                      </View>
                    )) ||
                    null
                  }
                  disableBottomSwipe={true}
                  animateCardOpacity={true}
                  onSwiped={index => {
                    setCardIndex(index);
                  }}
                  onSwipedRight={index => {
                    console.log(index);
                    onSwipeRight(index);
                  }}
                  onSwipedLeft={index => {
                    onSwipeLeft(index);
                  }}
                  onSwipedAll={() => {
                    //here we should load more horse cards
                    loadMoreHorse();
                  }}
                  onSwipedTop={cardIndex => {
                    props.navigation.navigate('Details', {
                      item: horsesList[cardIndex],
                      pubnub: pubnub
                    });
                    swiperRef.current.swipeBack();
                  }}
                  cardIndex={0}
                  backgroundColor={'#ffffff'}
                  containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  cardHorizontalMargin={0}
                  cardVerticalMargin={0}
                  stackSeparation={0}
                  stackSize={3}></Swiper>
              )}
            </View>
          ) : (
            <MapView
              ref={mapRef}
              // showsUserLocation={true}
              // followsUserLocation={true}
              // provider={PROVIDER_GOOGLE}
              showsMyLocationButton={false}
              preserveClusterPressBehavior={true}
              spiralEnabled={false}
              clusteringEnabled={true}
              onRegionChangeComplete={e => console.log(e)}
              // onClusterPress={(cluster, markers) =>
              // // clickonMarkers(cluster, markers)
              // {
              //   // console.log('rrrr', cluster);
              //   let region = {
              //     latitude: markers[0]?.geometry?.coordinates[1],
              //     longitude: markers[0]?.geometry?.coordinates[0],
              //     latitudeDelta: 0.0002,
              //     longitudeDelta: 0.0001,
              //   };
              //   mapRef?.current?.animateToRegion(region, 2000);
              // }}
              style={{
                marginTop: 20,
                borderRadius: 20,
                height: '65%',
                width: '97%',
                alignSelf: 'center',
              }}
              initialRegion={{
                latitude: detailLat ? detailLat : 71.6385898,
                longitude: detailLng ? detailLng : 29.5456146,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <Marker coordinate={{
                latitude: detailLat ? detailLat : 71.6385898,
                longitude: detailLng ? detailLng : 29.5456146,
              }} />
              {renderMarkers()}

              {/* <Marker coordinate={{latitude: 52.4, longitude: 18.7}} />
            <Marker coordinate={{latitude: 52.1, longitude: 18.4}} />
            <Marker coordinate={{latitude: 52.6, longitude: 18.3}} />
            <Marker coordinate={{latitude: 51.6, longitude: 18.0}} />
            <Marker coordinate={{latitude: 53.1, longitude: 18.8}} />
            <Marker coordinate={{latitude: 52.9, longitude: 19.4}} />
            <Marker coordinate={{latitude: 52.2, longitude: 21}} />
            <Marker coordinate={{latitude: 52.4, longitude: 21}} />
            <Marker coordinate={{latitude: 51.8, longitude: 20}} /> */}
            </MapView>
          )}
          {whichPage == 'swipper' ? (
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.circleBtn}
                onPress={pressDislike}>
                <Image
                  source={dislike}
                  resizeMode="contain"
                  style={[styles.icon, { marginTop: 6 }]}
                />
              </TouchableOpacity>
              <View style={{ alignItems: 'center', paddingTop: 12 }}>
                <Image source={chev} resizeMode="contain" style={styles.chev} />
                <Image source={chev} resizeMode="contain" style={styles.chev} />
                <TouchableOpacity
                  onPress={() => goToDetails(horsesList[cardIndex])}>
                  <Text style={styles.infoText}>Swipe up for details</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.circleBtn}
                onPress={pressLike}>
                <Image
                  source={like}
                  resizeMode="contain"
                  style={[styles.icon, { marginBottom: 0 }]}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={{ height: 80, width: '100%' }} />
      </View>
      <CustomTab navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default SwipingPage;

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    height: '17%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '45%',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    height: '13%',

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.color19,
  },
  chev: {
    width: 23,
    height: 10,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color3,
    marginTop: 16,
  },
  card: {
    // flex: 1,
    width: width - 32,
    height: '45%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  backIcon: {
    width: 18,
    height: 18,
  },
});
