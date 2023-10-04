import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '../../utils/colors'
import sendIcon from '../../assets/images/send.png'
import emoji from '../../assets/images/emoji.png'
import camera from '../../assets/images/camera.png'
import attach from '../../assets/images/paper_clip.png'
import ImagePicker from 'react-native-image-crop-picker'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { sendMessage } from '../../APIs/api'
const defaultHeight = 45
const inputColor = '#e9e9e9'
const MIN_COMPOSER_HEIGHT = Platform.select({
  android: 45,
  ios: 45
})
const PADDING_COMPOSER = 5

const MAX_COMPOSER_HEIGHT = 90
const ChatInput = ({
  user_two_detail,
  user_one_detail,
  setMessages,
  messages,
  chatChannel,
  pubnub,
  userBlock
}) => {
  const safeArea = useSafeAreaInsets()
  const defaultWrapperheight = safeArea.bottom + 5 + MIN_COMPOSER_HEIGHT
  const [keyboardHeight, setKeyboardHeight] = useState(
    Platform.OS == 'ios' ? 320 : 0
  )
  const [wrapperHeight, setWrapperHeight] = useState(defaultWrapperheight)
  const [isKeyboardShow, setIsKeyboardShow] = useState(false)
  const [composerHeight, setComposerHeight] = useState(MIN_COMPOSER_HEIGHT)
  const [textForSending, setTextForSending] = useState('')
  const isOpend = useSharedValue(false)
  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardHeight(Platform.OS == 'ios' ? e.endCoordinates.height : 0)
        // setIsKeyboardShow(true);
        isOpend.value = true
      }
    )
    const keyboardHide = Keyboard.addListener(
      Platform.OS == 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      e => {
        isOpend.value = false
      }
    )

    return () => {
      keyboardShow.remove()
      keyboardHide.remove()
    }
  }, [])

  const animatedHeight = useAnimatedStyle(() => {
    const height = isOpend.value
      ? Math.max(
          MIN_COMPOSER_HEIGHT,
          Math.min(MAX_COMPOSER_HEIGHT, composerHeight)
        ) +
        keyboardHeight +
        (Platform.OS == 'ios' ? PADDING_COMPOSER * 2 : PADDING_COMPOSER * 5)
      : Math.max(
          MIN_COMPOSER_HEIGHT,
          Math.min(MAX_COMPOSER_HEIGHT, composerHeight)
        ) +
        safeArea.bottom +
        PADDING_COMPOSER * 2
    return {
      height: withTiming(height, { duration: 200 })
    }
  }, [composerHeight])

  const onSendPress = async () => {
    //here we should handle send text message
    //function sendMessage(messageType, context, reciver_id)
    // const data = await sendMessage('', textForSending, user_two_detail.id);
    // const message = {
    //   content: textForSending,
    //   // uuid: user_one_detail.id,
    // };

    // const message = {
    //   message:{

    //   }
    //   text: textForSending,
    //   uuid: user_one_detail.id,
    // };

    // Publish our message to the channel `chat`
    // // pubnub.publish({channel: chatChannel, message, uuid: user_one_detail.id});
    // pubnub
    //   .publish({channel: chatChannel, message})
    //   .then(e => console.log('aaaaa', e));
    // console.log('idddd', user_one_detail.id);
    // const publishPayload = {
    //   channel: chatChannel,
    //   meta: {
    //     userId: user_one_detail.id,
    //   },
    //   message: {
    //     title: 'greeting',
    //     text: textForSending,
    //   },
    // };
    // await pubnub.publish(publishPayload);

    await pubnub.publish({
      channel: chatChannel,
      message: {
        text: textForSending
      }
    })

    setMessages(p => [
      {
        uuid: user_one_detail.email,
        timetoken: Date.now() * 10000,
        message: {
          text: textForSending
        }
      },
      ...p
    ])

    setTextForSending('')

    // const result = pubnub.getFileUrl({
    //   channel: chatChannel,
    //   id: 'b2960881-dfa0-412a-83d3-3b832826fde9',
    //   name: 'cat_picture.jpg',
    // });
    // console.log(result);

    //send image
    // const result = await pubnub.sendFile({
    //   channel: 'my_channel',
    //   message: {
    //     test: 'message',
    //     value: 42
    //   },
    //   file: {
    //     uri: imageUri,
    //     name: 'cat_picture.jpg',
    //     mimeType: 'image/jpeg',
    //   },
    // })
  }

  const attachBtnPress = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'any'
      // forceJpg: true,
    }).then(async image => {
      // console.log(image);
      if (
        Platform.OS === 'ios' &&
        (image.filename.endsWith('.heic') || image.filename.endsWith('.HEIC'))
      ) {
        image.filename = `${image.filename.split('.')[0]}.JPG`
      }

      // if(image.filename && !image.filename.includes('video') && !image?.mime.includes('video'))
      // {
      setMessages(p => [
        {
          uuid: user_one_detail.email,
          timetoken: Date.now() * 10000,
          message: {
            message: {},
            file: {
              text: 'file',
              id: null,
              url: image?.path,
              name: image?.filename
                ? image.filename
                : image?.mime.replace('/', '.')
            }
          }
        },
        ...p
      ])
      // }

      const result = await pubnub.sendFile({
        channel: chatChannel,
        message: {
          text: 'file'
        },
        file: {
          uri: image.path,
          name: image?.filename ?? image?.mime.replace('/', '.'),
          mimeType: image.mime
        }
      })
    })
  }

  const openCameraPress = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true
    }).then(image => {
      console.log(image)
    })
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingBottom: safeArea.bottom
        },
        animatedHeight
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={[
            styles.inputContainer,
            {
              height: Math.max(
                MIN_COMPOSER_HEIGHT,
                Math.min(MAX_COMPOSER_HEIGHT, composerHeight)
              )
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => attachBtnPress()}
            style={styles.inputButton}
          >
            <Image source={attach} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            value={textForSending}
            onChangeText={e => setTextForSending(e)}
            style={[
              styles.input,
              {
                height: Math.max(
                  MIN_COMPOSER_HEIGHT,
                  Math.min(MAX_COMPOSER_HEIGHT, composerHeight)
                )
              }
            ]}
            onContentSizeChange={e => {
              setComposerHeight(
                e.nativeEvent.contentSize.height + PADDING_COMPOSER * 4
              )
            }}
            multiline
          />
          {/* <TouchableOpacity style={styles.inputButton}>
            <Image
              source={emoji}
              resizeMode="contain"
              style={[styles.icon, { marginRight: 12 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButton}>
            <Image source={camera} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          disabled={!textForSending}
          style={styles.sendBtn}
          onPress={() => {
            // alert('test')
            if (userBlock) {
              Alert.alert('User Is Blocked !')
            } else {
              onSendPress()
            }
          }}
        >
          <Image
            source={sendIcon}
            resizeMode="contain"
            style={styles.sendbtnIcon}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

export default ChatInput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  inputContainer: {
    borderRadius: 30,
    height: 45,
    flex: 1,
    backgroundColor: inputColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  sendBtn: {
    marginLeft: 10,
    width: 60,
    height: 45,
    backgroundColor: COLORS.color3,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendbtnIcon: {
    width: 17
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
    padding: PADDING_COMPOSER,
    color: COLORS.black
  },
  icon: {
    width: 20
  },
  inputButton: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
