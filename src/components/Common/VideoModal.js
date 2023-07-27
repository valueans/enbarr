import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import closeIcon from '../../assets/images/add_white.png';
import * as Progress from 'react-native-progress';
const VideoModal = ({isVisible, setIsVisible, item}) => {
  const [play, setPlay] = useState(false);
  const [videoItem, setVideoItem] = useState({});
  const [loading, setLoading] = useState(true);
  const close = () => {
    setIsVisible(false);
  };
  const safeArea = useSafeAreaInsets();

  useEffect(() => {
    setVideoItem(item);

    return () => {
      setVideoItem({});
      setLoading(true);
      setPlay(false);
    };
  }, [item]);

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={close}
      backdropOpacity={0.9}
      onModalShow={() => {
        setPlay(!play);
      }}
      style={{margin: 0, padding: 0, justifyContent: 'flex-start'}}>
      <View style={{marginTop: safeArea.top + 16}}>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={close}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {loading ? (
            <Progress.Circle
              style={{position: 'absolute'}}
              indeterminate={true}
              color={'white'}
              size={65}
            />
          ) : null}
          {videoItem ? (
            <Video
              source={{uri: videoItem.file ? videoItem.file : undefined}}
              paused={!play}
              repeat={true}
              style={{width: '100%', height: '100%'}}
              poster={videoItem.file ? videoItem.file : undefined}
              resizeMode={'cover'}
              posterResizeMode={'cover'}
              fullscreen={false}
              controls={true}
              onVideoLoadStart={() => {
                setLoading(true);
              }}
              onVideoLoad={() => {
                setLoading(false);
              }}
              onBuffer={data => {
                console.log('on Buffer', data);
                if (data.isBuffering) {
                  setLoading(true);
                } else {
                  setLoading(false);
                }
              }}
            />
          ) : (
            <Text style={{color: 'white', fontSize: 24}}>
              Video not found!!!
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width,
    height: height * 0.7,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    width: 28,
    height: 28,
    transform: [{rotate: '45deg'}],
  },
});
