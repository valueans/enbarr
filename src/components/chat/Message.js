import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
import { profile_img } from '../../utils/data';
import triangle from '../../assets/images/triangle.png';
import { createThumbnail } from 'react-native-create-thumbnail';
import ImageModal from '../Modal/ShowImageVideo';
const { width, height } = Dimensions.get('screen');

const message_width = width * 0.75;
const mine_bubble_color = COLORS.color3; //'#0A0A44';
const target_bubble_color = '#F4F4F4';

const not_mine_text_color = '#302F32';
const mine_text_color = '#f4f4f4';

const BORDER_RADIUS = 10;

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Message = ({ mine, avatar, item, pubnub, chatChannel }) => {
  // console.log(convertTimestamp(item.item.timetoken / 10000000));
  // console.log(item.item.timetoken);
  useEffect(() => {
    if (item.item.message.file) {
      console.log('aaaaaa', item.item);
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
        .then(response => setThumbVideo(response.path))
        .catch(err => console.log({ err }));
    }
  };

  const openVideoPress = (fileID, fileName) => {
    result = pubnub.getFileUrl({
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
  };

  const renderImageAndVideo = item => {
    if (item.name.endsWith('.jpg') || item.name.endsWith('.JPG')) {
      //imager

      return (
        <TouchableOpacity
          onPress={() => {
            dialogeRefImage.current.open();
            setImageOpenUrl(
              item.id ? getFileURl(item.id, item.name, 'img') : item.url,
            );
          }}>
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
        <TouchableOpacity onPress={() => openVideoPress(item.id, item.name)}>
          <Image
            style={styles.ttesst}
            source={{
              uri: thumbVideo,
            }}></Image>
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
            {item.item.message.file ? (
              renderImageAndVideo(item.item.message.file)
            ) : (
              <Text
                style={[mine ? styles.text_mine : styles.text_not_mine]}
                numberOfLines={Math.random() * 5}>
                {item.item.message.text}
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
              {convertTimestamp(item.item.timetoken / 10000000)}
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
  },
  text_not_mine: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: not_mine_text_color,
    fontSize: 12,
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
});
