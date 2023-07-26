import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../../utils/Color';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import Pinchable from 'react-native-pinchable';

const closeImage = require('../../assets/images/close.png');
const playImage = require('../../assets/images/play.png');
const pauseImage = require('../../assets/images/pause.png');

const {width, height} = Dimensions.get('screen');
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const ANIMATION_CLOSE_TIME = 300;
const ANIMATION_OPEN_TIME = 300;

const ImageModal = forwardRef((props, ref) => {
  const {image, video, vid_thumbnail} = props;

  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const openModal = useSharedValue(false);

  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0);

  const [loading, setLoading] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  const [isPaused, setIsPaused] = useState(false);
  const paused = useSharedValue(isPaused);

  const open = useCallback(() => {
    // openModal.value = true;
    setVisible(true);
    modalOpacity.value = withTiming(1, {duration: ANIMATION_OPEN_TIME});
    modalScale.value = withTiming(1, {duration: ANIMATION_OPEN_TIME});
  }, []);
  const close = useCallback(() => {
    // openModal.value = false;
    setFirstFrameLoaded(false);
    setTimeout(() => {}, ANIMATION_CLOSE_TIME + 10);
    modalScale.value = withTiming(0, {duration: ANIMATION_CLOSE_TIME});
    modalOpacity.value = withTiming(
      0,
      {duration: ANIMATION_CLOSE_TIME / 2},
      () => {
        runOnJS(setVisible)(false);
      },
    );
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const gesture = Gesture.Pan()
    .onBegin(e => {})
    .onUpdate(e => {
      if (translateY.value < 150) {
        translateY.value = e.translationY;
      }
    })
    .onEnd(e => {
      if (translateY.value > 100 || translateY.value < -100) {
        runOnJS(close)();
      }
      translateY.value = withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [-350, 0, 350];
    const outputRange = [0.9, 1, 0.9];
    const scale = interpolate(translateY.value, inputRange, outputRange);
    const opacity = interpolate(translateY.value, inputRange, [0.1, 1, 0.1]);
    return {
      opacity,
      transform: [
        {translateY: translateY.value},
        {scale},
        {scale: imageScale.value},
      ],
    };
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [0, 150];
    const outputRange = [1, 0];
    const opacity = interpolate(translateY.value, inputRange, outputRange);
    return {
      opacity,
    };
  }, []);

  const modalAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
      transform: [
        {
          scale: modalScale.value,
        },
      ],
    };
  }, []);
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      if (e.scale >= 0.97) {
        imageScale.value = e.scale;
      }
    })
    .onEnd(e => {
      imageScale.value = withTiming(1);
    });

  const togglePaused = () => {
    paused.value = !isPaused;
    setIsPaused(x => !x);
  };
  const animatedBtn = useAnimatedStyle(() => {
    return {
      opacity: paused.value
        ? withTiming(1, {duration: 300})
        : withTiming(0, {duration: 300}),
    };
  }, []);

  return (
    <Modal style={{flex: 1}} visible={visible} transparent>
      <StatusBar hidden />
      <GestureDetector style={{flex: 1}} gesture={gesture}>
        <Animated.View style={[styles.container, modalAnimationStyle]}>
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => close()}>
              {/* <IonIcons name="close" size={35} color={COLORS.gray_3} /> */}
              <Image
                source={closeImage}
                style={{width: 40, height: 40}}></Image>
            </TouchableOpacity>
          </Animated.View>
          {/* <GestureDetector gesture={pinchGesture}> */}
          <Animated.View style={[animatedStyle]}>
            {image ? (
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pinchable>
                  <Image
                    style={{width: width, height: height}}
                    source={{uri: image}}
                    onLoadStart={() => {
                      setLoading(true);
                    }}
                    onLoad={() => {
                      setLoading(false);
                    }}
                    resizeMode="contain"
                    //   width={imageSize.widths}
                    //   height={imageSize.height}
                  ></Image>
                </Pinchable>
                {loading ? (
                  <Progress.Circle
                    style={{position: 'absolute'}}
                    indeterminate={true}
                    // color={COLORS.gray_5}
                  />
                ) : null}
              </View>
            ) : null}
            {video ? (
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Video
                  muted={false}
                  source={{
                    uri: video,
                  }}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#000',
                    height: height,
                    width: width,
                    borderRadius: 15,
                  }}
                  playWhenInactive
                  // controls={false}
                  bufferConfig={{
                    minBufferMs: 100,
                    maxBufferMs: 1000,
                    bufferForPlaybackMs: 100,
                    bufferForPlaybackAfterRebufferMs: 150,
                  }}
                  poster={vid_thumbnail}
                  posterResizeMode={'contain'}
                  resizeMode={'contain'}
                  repeat={true}
                  paused={isPaused}
                  onVideoLoadStart={e => {
                    setLoading(true, e);
                  }}
                  onVideoLoad={() => {
                    setLoading(false);
                  }}
                  onReadyForDisplay={() => {
                    setFirstFrameLoaded(true);
                    console.log('first frame');
                  }}
                  onBuffer={data => {
                    console.log('on Buffer', data);
                    if (data.isBuffering) {
                      setLoading(true);
                    } else {
                      setLoading(false);
                    }
                  }}
                  // controls={true}
                  onError={e => console.log('video error', e)}
                  onVideoEnd={() => {
                    console.log('end of video');
                  }}
                  onEnd={() => {
                    togglePaused();
                  }}
                  playInBackground={false}

                  // playInBackground={true}
                  // playWhenInactive={true}
                  // controlTimeout={2000}
                ></Video>

                {firstFrameLoaded ? (
                  <Pressable
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      width,
                      height,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      zIndex: 100,
                    }}
                    onPress={togglePaused}>
                    <Animated.View style={[styles.pauseBtn, animatedBtn]}>
                      {/* <IonIcons
                        name={isPaused ? 'play' : 'pause'}
                        size={40}
                        color={'rgba(255,255,255,1)'}
                      /> */}
                      <Image
                        source={isPaused ? playImage : pauseImage}
                        style={{width: 50, height: 50}}></Image>
                    </Animated.View>
                  </Pressable>
                ) : null}
                {loading ? (
                  <Progress.Circle
                    style={{position: 'absolute'}}
                    indeterminate={true}
                    // color={COLORS.gray_5}
                  />
                ) : null}
              </View>
            ) : null}
          </Animated.View>
          {/* </GestureDetector> */}
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
});

export default ImageModal;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  header: {
    position: 'absolute',
    width: width,

    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 32,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    paddingTop: 50,
    paddingBottom: 20,
  },
  pauseBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
