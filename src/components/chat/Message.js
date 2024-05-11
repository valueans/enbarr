import { Dimensions, StyleSheet, Text, View, Image, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
import { profile_img } from '../../utils/data';
import triangle from '../../assets/images/triangle.png';
import { createThumbnail } from 'react-native-create-thumbnail';
import ImageModal from '../Modal/ShowImageVideo';
const { width, height } = Dimensions.get('screen');
import playIcon from '../../assets/images/play.png';

const message_width = width * 0.75;
const mine_bubble_color = COLORS.color3; //'#0A0A44';
const target_bubble_color = '#F4F4F4';

const not_mine_text_color = '#302F32';
const mine_text_color = '#f4f4f4';

const BORDER_RADIUS = 10;

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AnimatedLoader from '../AnimatedLoader';
import { SkypeIndicator } from 'react-native-indicators';

const Message = ({
  length,
  index,
  isFileSent,
  mine,
  avatar,
  item,
  pubnub,
  chatChannel,
  onPressVideo }) => {

  useEffect(() => {
    if (item.message.file) {
    }
  }, []);

  const [thumbVideo, setThumbVideo] = useState('');
  const [imageOpenUrl, setImageOpenUrl] = useState('');
  const [videoOpenUrl, setVideoOpenUrl] = useState('');
  const [vid_thumbnail, setVidThumb] = useState('');
  const dialogeRefImage = useRef(null);
  const dialogeRefVideo = useRef(null);

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = 'AM',
      time;

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    // time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    time = h + ':' + min + ' ' + ampm;
    return time;
  }

  const getFileURl = (fileID, fileName, fileType, url) => {
    if (fileType == 'img') {
      const result = pubnub.getFileUrl({
        channel: chatChannel,
        id: fileID,
        name: fileName,
      });
      return result;
    } else if (fileType == 'vid') {
      var result = '';
      if (fileID != null) {
        result = pubnub.getFileUrl({
          channel: chatChannel,
          id: fileID,
          name: fileName,
        });
      } else {
        result = url;
      }
   
      createThumbnail({
        url: result,
        timeStamp: 1,
      })
        .then(response => {
          Platform.OS == 'ios' ? setThumbVideo(response.path) : setThumbVideo(result)
        })
        .catch(err => console.log({ err }, 'error response.path'));
    }
  };

  const openVideoPress = (fileID, fileName, thumbVideo,localUrl) => {
    console.log(localUrl)
    if(localUrl) {
      setVideoOpenUrl(localUrl);
      dialogeRefVideo.current.open();
      return
    }
    // if*
    if (fileID && fileName) {
      let result = pubnub.getFileUrl({
        channel: chatChannel,
        id: fileID,
        name: fileName,
      });

      createThumbnail({
        url: result,
        timeStamp: 1,
      })
        .then(response => setVidThumb(response.path))
        .catch(err => console.log({ err }));
      setVideoOpenUrl(result);
      dialogeRefVideo.current.open();
    }
    else if (thumbVideo) {
      setVideoOpenUrl(thumbVideo)
      dialogeRefVideo.current.open();

      // onPressVideo()
    }
  };

  const renderImageAndVideo = (item, index,localUrl) => {
  

    if (item.name.endsWith('.jpg') || item.name.endsWith('.JPG') || item.name.endsWith('.png') || item.name.endsWith('.PNG') || item.name.endsWith('.jpeg') || item.name.endsWith('.JPEG')) {
      return (
        <TouchableOpacity
          onPress={() => {
            dialogeRefImage.current.open();
            setImageOpenUrl(
              item.id ? getFileURl(item.id, item.name, 'img') : item.url,
            );
          }}>
          {
            (isFileSent && index == 0) &&
            <View style={{
              position: 'absolute',
              zIndex: 999999,
              height: 170,
              width: 170,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* <AnimatedLoader isLoading={isFileSent} /> */}
              <SkypeIndicator size={30} color={'#4f5c8c'} />
            </View>
          }
          <Image
            style={styles.ttesst}
            source={{
              uri: item.id ? getFileURl(item.id, item.name, 'img') : item.url,
            }}></Image>
        </TouchableOpacity>
      );
    } else {
      getFileURl(item.id, item.name, 'vid', item.url);
   
      return (
        <TouchableOpacity
          onPress={() => openVideoPress(item?.id, item?.name, thumbVideo,localUrl)}>

          {
            Platform.OS == 'ios' ?
              <Image
                style={styles.ttesst}
                source={{
                  uri: thumbVideo,
                }} />
              :
              <Video
                style={styles.ttesst}
                // paused={true}
                muted={true}
                onLoadStart={() => setTimeout(() => {

                }, 1500)}
                resizeMode={'cover'}
                source={{
                  uri: thumbVideo,
                }}>
              </Video>
          }
          {
            (isFileSent && index == 0) ?
              <View style={{
                position: 'absolute',
                zIndex: 999999,
                height: 170,
                width: 170,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* <AnimatedLoader isLoading={true} /> */}
                <SkypeIndicator size={30} color={'#4f5c8c'} />
              </View>
              :
              <Pressable
                style={styles.playBtn}
                onPress={() => openVideoPress(item.id, item.name)}
              >
                <Image
                  source={playIcon}
                  resizeMode="cover"
                  style={{ width: 50, height: 50 }}
                />
              </Pressable>
          }


        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.wrapper, { marginBottom: mine ? 10 : 25 }]}>
      <ImageModal
        ref={dialogeRefImage}
        video={null}
        image={imageOpenUrl}
      // imageSize={{ width: imageWidth, height: imageHeight }}
      />
      <ImageModal
        vid_thumbnail={vid_thumbnail}
        ref={dialogeRefVideo}
        video={videoOpenUrl}
        image={null}
      // imageSize={{ width: imageWidth, height: imageHeight }}
      />
      <View
        style={[
          styles.message,
          mine ? styles.message_mine : styles.message_not_mine,
        ]}>
        {/* {mine ? null : <Image source={{uri: avatar}} style={styles.avatar} />} */}
        <View>
          <View
            style={[
              styles.cloud,
              mine ? styles.cloud_mine : styles.cloud_not_mine,
            ]}>
            {item.message.file ? (
              renderImageAndVideo(item.message.file, index,item?.localUrl)
            ) : (
              <Text
                style={[mine ? styles.text_mine : styles.text_not_mine]}
                numberOfLines={Math.random() * 5}>
                {item.message.text}
              </Text>
            )}

            <View style={[styles.arrow, { display: mine ? 'flex' : 'none' }]}>
              <Image
                style={styles.arrowImg}
                resizeMode="contain"
                source={triangle}
              />
            </View>
          </View>
          {/* message footer */}
          <View
            style={[
              styles.messageFooter,
              { flexDirection: mine ? 'row-reverse' : 'row' },
            ]}>
            <Text style={styles.time}>
              {convertTimestamp(item.timetoken / 10000000)}
            </Text>
            {/* <Text style={[styles.time, {display: mine ? 'flex' : 'none'}]}>
              seen
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 15,
  },
  message: {
    width: '100%',
  },
  message_mine: {
    flexDirection: 'row-reverse',
  },
  message_not_mine: {
    flexDirection: 'row',
  },
  cloud: {
    padding: 10,
    maxWidth: message_width,
    position: 'relative',
  },
  cloud_mine: {
    backgroundColor: mine_bubble_color,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  cloud_not_mine: {
    backgroundColor: target_bubble_color,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  text_mine: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: mine_text_color,
    fontSize: 12,
    marginRight:5
  },
  text_not_mine: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: not_mine_text_color,
    fontSize: 12,
    marginLeft:5
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 12,
    marginTop: -20,
  },
  ttesst: {
    width: 170,
    height: 170,
  },
  time: {
    color: COLORS.color3,
    fontSize: 10,
    fontFamily: fonts.light,
  },
  arrow: {
    position: 'absolute',
    top: -5,

    right: -7,
    bottom: 0,
    zIndex: 10,
    flex: 1,
  },
  arrowImg: {
    width: 30,
  },
  playBtn: {
    width: 170,
    height: 170,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: 20,
    // left:20,
    // alignItems:'center'
    shadowOffset: {
      width: 0,
      height: 0,
    },
    zIndex: 99999999,
  },
});
