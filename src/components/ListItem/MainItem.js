import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import COLORS, { ColorShade } from '../../utils/colors';
import { BlurView } from '@react-native-community/blur';
import fonts from '../../utils/fonts';
import SpecialButton from '../Button/SpecialButton';
import { globalStyle } from '../../utils/GlobalStyle';
import message from '../../assets/images/envelope.png';
import heart from '../../assets/images/heart.png';
import heartFill from '../../assets/images/heart_fill.png';

import { addHorseToFav, deleteHorseToFav } from '../../APIs/api';
const { width, height } = Dimensions.get('screen');

const DEFAULT_IMAGE = require('../../assets/images/user.png');

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Video from 'react-native-video';
import playIcon from '../../assets/images/play.png';
const MainItem = ({
  item,
  index,
  onPressDetails = () => { },
  onPressMessage = () => { },
  onPressImage = () => { },
  pubnub,
}) => {
  const { images, userprofile, title, isfav, description, id } = item;
  const [isLiked, setIsLiked] = useState(isfav);
  const [isLoadingPic, setIsLoadingPic] = useState(false);
  const [play, setPlay] = useState(false);
  const favouriteIconPress = async () => {
    if (isLiked) {
      setIsLiked(x => !x);
      // console.log('should dis');
      const data = await deleteHorseToFav(id);
    } else {
      setIsLiked(x => !x);
      // console.log('should like');
      const data = await addHorseToFav(id);
      console.log(data);
    }
  };
  const goToChat = () => {
    onPressMessage();
  };
  const FooterWrapper = ({ children }) => {
    return Platform.OS == 'android' ? (
      <View style={styles.ViewContainer}>{children}</View>
    ) : (
      <BlurView style={styles.blurContainer} blurType="dark" blurAmount={10}>
        {children}
      </BlurView>
    );
  };

  return (
    <TouchableOpacity key={index} activeOpacity={0.9} onPress={onPressDetails}>
      <View style={styles.container}>
        {images.length > 0 ? (
          images[0].file_type == 'VIDEO' ? (
            <View
              // onPress={() => console.log('asdfasdf')}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Video
                style={{ width: '100%', height: '100%' }}
                posterResizeMode={'cover'}
                resizeMode={'cover'}
                poster={images[0].file}
                source={{ uri: images[0].file }}
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
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Image
              onLoad={() => setIsLoadingPic(false)}
              onLoadStart={() => setIsLoadingPic(true)}
              onLoadEnd={() => setIsLoadingPic(false)}
              source={{ uri: images.length > 0 ? images[0].file : '' }}
              style={styles.img}
            // resizeMode="cover"
            />
          )
        ) : null}

        {isLoadingPic ? (
          <View style={{ position: 'absolute', top: 100 }}>
            <BarIndicator size={20} color={COLORS.color14}></BarIndicator>
          </View>
        ) : null}
        <View style={styles.overlay}>
          <View style={styles.topContent}>
            {/* avatar & name */}
            <View style={styles.row}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                {false ? (
                  <Image style={styles.avatar} source={{ uri: '' }} />
                ) : (
                  <Image
                    source={DEFAULT_IMAGE}
                    style={[styles.noAvatar]}
                    resizeMode="contain"
                  />
                )}
              </View>

              <View style={styles.nameContainer}>
                <Text style={styles.username}>
                  {userprofile.first_name
                    ? userprofile.first_name + ' '
                    : userprofile?.user?.username}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.circleBtnContainer]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.circleBtn, { marginRight: 12 }]}
                onPress={goToChat}>
                <Image
                  source={message}
                  resizeMode="contain"
                  style={[styles.icon]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.circleBtn}
                onPress={() => favouriteIconPress()}>
                <Image
                  source={isLiked ? heartFill : heart}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <FooterWrapper>
              <View>
                <Text style={styles.horseName}>{title}</Text>

                <Text style={styles.description}>
                  {description}

                  {/* <Text style={styles.btnText}>Read More</Text> */}
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <SpecialButton onPress={onPressDetails}>Details</SpecialButton>
              </View>
            </FooterWrapper>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MainItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 1.15,
    borderRadius: 30,
    backgroundColor: COLORS.color11,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    flex: 1,
    height: '100%',
    width: width,
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
  ViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(27, 24, 25, 0.9)',
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
  noAvatar: {
    width: 25,
    height: 25,
    opacity: 0.5,
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
    bottom: -25,
    zIndex: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  playBtn: {
    width: 70,
    height: 70,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 100,
  },
});
