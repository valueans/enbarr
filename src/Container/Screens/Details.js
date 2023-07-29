import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { globalStyle } from '../../utils/GlobalStyle';
import COLORS, { ColorShade } from '../../utils/colors';
import fonts from '../../utils/fonts';
import HomeHeader from '../../components/Common/HomeHeader';
import message from '../../assets/images/envelope.png';
import heart from '../../assets/images/heart.png';
import heartFill from '../../assets/images/heart_fill.png';
import locationIcon from '../../assets/images/location.png';
const { width, height } = Dimensions.get('screen');
import profileImage from '../../assets/images/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import ScreenTitle from '../../components/Text/ScreenTitle';
import Seprator from '../../components/Layout/Seprator';
import Feature from '../../components/Text/Feature';
import Carousel from '../../components/Common/Carousel';
import shareIcon from '../../assets/images/share.png';
import blockIcon from '../../assets/images/block.png';
import CustomTab from '../../components/Layout/CustomTab';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import arrowLeft from '../../assets/images/arrowLeft.png';

import {
  getHorseDetails,
  deleteHorseToFav,
  addHorseToFav,
  getOrCreateNewChannel,
  getSpecialHorseDistance,
} from '../../APIs/api';
import PubNub from 'pubnub';
import * as PubNubKeys from '../Tabs/Chat/PubNubKeys';
global.item2 = {};
import ReportModal from '../../components/Common/ReportModal';
import { baseUrl } from '../../../backend/frontend/src/Constants/urls';
const Details = props => {
  const [isLiked, setIsLiked] = useState(props?.route?.params?.item?.isfav);
  const [horseImages, setHorseImages] = useState([]);
  const [myImage, setMyImage] = useState('');
  const [reportModal, setReportModal] = useState(false);
  const [distance, setDistance] = useState(0);
  const [item, setItem] = useState(props?.route?.params?.item);
  // const {item} = props.route.params;
  // console.log('qqweweqweqwe', item.id);
  const getFromMapDetail = async () => {
    console.log('pppppppp', props?.route?.params.item.user_location);
    // get horse detail by ID
    var obj = [];
    const data = await getHorseDetails(props?.route?.params?.id);
    setItem(data[1]);

    data[1].images?.map((item, index) => {
      obj.push(item);
    });
    setHorseImages(obj);
  };

  // const {userprofile} = item;
  // const pubnub = new PubNub({
  //   subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
  //   publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
  //   userId: `${data?.user?.email}`,
  // });

  const gotoChat = async () => {
    const data = await getOrCreateNewChannel(item?.userprofile?.user?.id);
    if (data.data) {
      props.navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: props?.route?.params?.pubnub,
      });
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };

  useEffect(() => {
    if (props?.route?.params?.from == 'map') {
      getFromMapDetail();
    }

    console.log('asdfasdfwwwww', props?.route?.params?.item?.lat);

    getDistance();
    getMyImage();
    var obj = [];
    console.log(JSON.stringify(item, null, 2));
    if (props?.route?.params?.from !== 'map') {
      item?.images?.map((item, index) => {
        obj.push(item);
      });
      setHorseImages(obj);
    }
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

  const getDistance = async () => {
    //item.id
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {
        const data = await getSpecialHorseDistance(
          item?.id,
          position.coords.latitude,
          position.coords.longitude,
        );
        console.log('fffffff', data[1].distance);
        setDistance(data[1].distance);
      });
    } else {
      setDistance(0);
    }
  };

  const safeArea = useSafeAreaInsets();

  const onSharePressed = async () => {
    try {
      const result = await Share.share({
        message: `${baseUrl}home/horse?id=${props?.route?.params?.item?.id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onReportPress = async () => {
    setReportModal(true);
  };

  const favPressed = async () => {
    if (isLiked) {
      setIsLiked(x => !x);
      console.log('should dis');
      const data = await deleteHorseToFav(item.id);
    } else {
      setIsLiked(x => !x);
      console.log('should like');
      const data = await addHorseToFav(item.id);
      console.log(data);
    }
  };

  const getMyImage = async () => {
    const myBase64ProfileImage = await AsyncStorage.getItem('myProfilePicture');
    setMyImage(myBase64ProfileImage);
  };

  const FooterWrapper = ({ children }) => {
    return Platform.OS == 'android' ? (
      <View style={styles.ViewAndroid}>{children}</View>
    ) : (
      <BlurView style={styles.blury} blurType="dark" blurAmount={10}>
        {children}
      </BlurView>
    );
  };
  return (
    <View style={[globalStyle.container, { backgroundColor: COLORS.white }]}>
      <StatusBar barStyle={'light-content'} />

      <ReportModal
        visible={reportModal}
        setVisible={setReportModal}
        horseID={item?.id}
      />
      <View
        style={[styles.headerContainer, { top: safeArea.top + 12, zIndex: 10 }]}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginBottom: 10 }}
          onPress={() => props.navigation.goBack()}>
          <Image source={arrowLeft} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <HomeHeader
          avatar={myImage}
          showLine2={false}
          showLine3={false}
          navigation={props.navigation}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.albumContainer}>
          <Carousel items={horseImages}>
            <FooterWrapper>
              <View style={styles.row}>
                <Image
                  style={styles.avatar}
                  source={profileImage}
                  resizeMode="contain"
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.username}>
                    {item?.userprofile?.first_name
                      ? item?.userprofile?.first_name
                      : item?.userprofile?.user?.email.substring(
                        0,
                        item?.userprofile?.user?.email.lastIndexOf('@'),
                      )}
                  </Text>
                </View>
              </View>
            </FooterWrapper>
          </Carousel>
        </View>
        <View style={styles.contentContainer}>
          {/* buttons */}
          <View style={[styles.row, styles.circleBtnContainer]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.circleBtn, { marginRight: 12 }]}
              onPress={() => onReportPress()}>
              <Image
                source={blockIcon}
                resizeMode="contain"
                style={[styles.icon]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.circleBtn, { marginRight: 12 }]}
              onPress={() => onSharePressed()}>
              <Image
                source={shareIcon}
                resizeMode="contain"
                style={[styles.icon]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => gotoChat()}
              activeOpacity={0.9}
              style={[styles.circleBtn, { marginRight: 12 }]}>
              <Image
                source={message}
                resizeMode="contain"
                style={[styles.icon]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.circleBtn}
              onPress={() => favPressed()}>
              <Image
                source={isLiked ? heartFill : heart}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <ScreenTitle size={20} style={{ marginVertical: 12, marginBottom: 6 }}>
            {item?.title}
          </ScreenTitle>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.row}>
              <Image
                source={locationIcon}
                style={styles.locationIcon}
                resizeMode="contain"
              />
              <Text style={styles.distance}>{distance.toFixed(1)} miles</Text>
            </View>
            <ScreenTitle size={20} marginVertical={0} style={{ marginTop: 4 }}>
              $
              {item?.price
                ?.toString()
                ?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
            </ScreenTitle>
          </View>
          <Text style={styles.description}>{item?.description}</Text>
          <View
            style={[
              styles.row,
              { marginTop: 6, marginBottom: 12, alignItems: 'baseline' },
            ]}>
            <ScreenTitle size={12}>Characteristics</ScreenTitle>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Seprator left={false} />
            </View>
          </View>
          {/* features */}
          <View style={styles.row}>
            <View style={{ flex: 2 }}>
              <Feature
                style={styles.feature}
                title={'Breed'}
                value={item?.breed?.breed}
              />
              <Feature style={styles.feature} title={'Age'} value={item?.age} />
              <Feature
                style={styles.feature}
                title={'Height (hands)'}
                value={item?.height}
              />
              <Feature
                style={styles.feature}
                title={'Discipline'}
                value={item?.discipline?.discipline}
              />
            </View>
            <View style={{ flex: 3 }}>
              <Feature
                style={styles.feature}
                title={'Gender'}
                value={item?.gender}
              />
              <Feature
                style={styles.feature}
                title={'Color'}
                value={item?.color?.color}
              />
              <Feature
                style={styles.feature}
                title={'Temperament'}
                value={item?.temperament?.temperament}
              />
              <Feature
                style={styles.feature}
                title={'Price'}
                value={`$${item?.price
                  ?.toString()
                  ?.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`}
              />
            </View>
          </View>
        </View>
        <MapView
          // provider={Platform.OS == "android"? PROVIDER_GOOGLE:}
          // provider={PROVIDER_GOOGLE}
          // followsUserLocation={true}
          // userLocationCalloutEnabled={true}
          // showsMyLocationButton={true}
          style={{
            marginTop: 20,
            borderRadius: 20,
            height: 180,
            width: '97%',
            alignSelf: 'center',
          }}
          initialRegion={{
            latitude: props?.route?.params?.item?.lat
              ? props?.route?.params?.item?.lat
              : props?.route?.params?.item?.user_location.coordinates[1],
            longitude: props?.route?.params?.item?.lng
              ? props?.route?.params?.item?.lng
              : props?.route?.params?.item?.user_location.coordinates[0],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable={false}
            coordinate={{
              latitude: props?.route?.params?.item.lat
                ? props?.route?.params?.item?.lat
                : props?.route?.params?.item?.user_location.coordinates[1],
              longitude: props?.route?.params?.item.lng
                ? props?.route?.params?.item.lng
                : props?.route?.params?.item?.user_location.coordinates[0],
            }}
          />
        </MapView>
      </ScrollView>
      <CustomTab navigation={props.navigation} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  albumContainer: {
    width,
    height: height * 0.55,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  blury: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 61,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewAndroid: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 61,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: 'white',
  },
  nameContainer: {
    paddingHorizontal: 10,
    height: 25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: ColorShade(COLORS.black, 50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontWeight: '600',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleBtn: {
    ...globalStyle.shadowBtn,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  circleBtnContainer: {
    position: 'absolute',
    right: 10,
    top: -25,
    zIndex: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  contentContainer: {
    paddingHorizontal: 20,
    position: 'relative',
  },
  locationIcon: {
    width: 15,
    height: 15,
  },
  distance: {
    marginLeft: 4,
    fontFamily: fonts.regular,
    color: COLORS.color10,
    fontSize: 12,
  },
  description: {
    marginTop: 12,
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color10,
    fontSize: 11,
    lineHeight: 18,
  },
  feature: {
    marginBottom: 18,
  },
});
