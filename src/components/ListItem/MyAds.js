import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import COLORS, {ColorShade} from '../../utils/colors';
import {BlurView} from '@react-native-community/blur';
import fonts from '../../utils/fonts';
import SpecialButton from '../Button/SpecialButton';
import {globalStyle} from '../../utils/GlobalStyle';
import message from '../../assets/images/envelope.png';
import heart from '../../assets/images/heart.png';
import heartFill from '../../assets/images/heart_fill.png';
import {BarIndicator} from 'react-native-indicators';
import {deleteAHorse} from '../../APIs/api';
import Video from 'react-native-video';
import playIcon from '../../assets/images/play.png';

const {width, height} = Dimensions.get('screen');

import {horsesUri} from '../../utils/data';

const MyAds = props => {
  const {images, title, description, likes, user} = props.item;
  const [isLiked, setIsLiked] = useState(false);
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  const [play, setPlpay] = useState(false);

  const deleteHorsePress = async () => {
    Alert.alert('Attention', 'Are you share you want to delete post?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => deleteHorse()},
    ]);
    // console.log(props.fetchHorseInAdsPage);
  };

  const deleteHorse = async () => {
    const data = await deleteAHorse(props.item.id);
    if (data) {
      var x = props.myHorses.filter((itm, index) => itm.id !== props.item.id);
      props.setMyHorses(x);
    } else {
      Alert.alert('Please try again');
    }
  };
  const FooterWrapper = ({children}) => {
    return Platform.OS == 'android' ? (
      <View style={styles.ViewContainer}>{children}</View>
    ) : (
      <BlurView style={styles.blurContainer} blurType="dark" blurAmount={10}>
        {children}
      </BlurView>
    );
  };

  const detailPress = async () => {
    console.log('sa', props.item);
    props.navigation.navigate('Details', {item: props.item});
  };
  return (
    <TouchableOpacity onPress={detailPress} activeOpacity={0.9}>
      <View style={styles.container}>
        {images.length > 0 ? (
          images[0].file_type == 'VIDEO' ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Video
                style={{width: '100%', height: '100%'}}
                posterResizeMode={'cover'}
                resizeMode={'cover'}
                poster={images[0].file}
                source={{uri: images[0].file}}
                repeat={true}
                paused={!play}
                fullscreen={play}
                onFullscreenPlayerWillDismiss={() => {
                  setPlay(!play);
                }}
              />
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => setPlay(!play)}>
                <Image
                  source={playIcon}
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              onLoad={() => setIsLoadingPicture(false)}
              onLoadStart={() => setIsLoadingPicture(true)}
              onLoadEnd={() => setIsLoadingPicture(false)}
              source={{uri: images.length > 0 ? images[0].file : ''}}
              style={styles.img}
              // resizeMode="cover"
            />
          )
        ) : null}

        {isLoadingPicture ? (
          <View style={{position: 'absolute', top: 100}}>
            <BarIndicator size={20} color={COLORS.color14}></BarIndicator>
          </View>
        ) : null}
        <View style={styles.overlay}>
          <View style={styles.topContent}>
            {/* avatar & name */}
            {/* <View style={styles.row}>
            <Image style={styles.avatar} source={{uri: user.avatar}} />
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{user.name}</Text>
            </View>
          </View> */}
            <View style={[styles.row, styles.circleBtnContainer]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.circleBtn}
                onPress={() => setIsLiked(x => !x)}>
                <Image
                  source={heartFill}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <Text style={styles.circleBtnText}>{likes}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <FooterWrapper
              style={styles.blurContainer}
              blurType="dark"
              blurAmount={10}>
              <View>
                <Text style={styles.horseName}>{title}</Text>

                <Text style={styles.description}>
                  {description}

                  {/* <Text style={styles.btnText}>Read More</Text> */}
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <SpecialButton
                  onPress={() => detailPress()}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 3,
                    elevation: 3,
                  }}>
                  Details
                </SpecialButton>
                <SpecialButton
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 2,
                    elevation: 2,
                  }}
                  width={120 + 90}
                  textAlign={'start'}
                  textStyle={{paddingLeft: 20, color: COLORS.color3}}
                  backgroundColor={COLORS.white}
                  secondaryColor={COLORS.color3}
                  onPress={() => {
                    props.navigation.navigate('Seller', {
                      source: 'edit',
                      horseID: props.item.id,
                    });
                  }}
                  // reverse={true}
                >
                  Edit
                </SpecialButton>
                <SpecialButton
                  onPress={() => deleteHorsePress()}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                    elevation: 1,
                  }}
                  width={127 + 210}
                  textAlign={'start'}
                  backgroundColor={COLORS.red2}
                  secondaryColor={COLORS.white}
                  // textStyle={{ paddingLeft: 10 }}
                >
                  Remove Ads
                </SpecialButton>
              </View>
            </FooterWrapper>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 1.15,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: width,
    height: '100%',
    borderRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
  topContent: {
    height: '64%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 2,
    elevation: 2,
  },
  footer: {
    height: '36%',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
    // backgroundColor: "green",
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(27, 24, 25, 0.1)',
    justifyContent: 'space-between',
  },
  horseName: {
    fontSize: 20,
    color: COLORS.white,
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: fonts.medium,
    fontWeight: '600',
  },
  description: {
    paddingLeft: 10,
    marginTop: 5,
    color: COLORS.white,
    fontFamily: fonts.light,
    fontSize: 12,
    paddingRight: 10,
    alignItems: 'baseline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.white,
    fontFamily: fonts.regular,
    // fontWeight: "600",
    fontSize: 12,
    // marginTop: 5,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
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
  circleBtn: {
    ...globalStyle.shadowBtn,
    // width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    // paddingVertical: 10,
    flexDirection: 'row',
  },
  circleBtnText: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 10,
    color: COLORS.color10,
  },
  circleBtnContainer: {
    position: 'absolute',
    right: 10,
    bottom: -25,
    zIndex: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  ViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(27, 24, 25, 0.9)',
    justifyContent: 'space-between',
  },
});
