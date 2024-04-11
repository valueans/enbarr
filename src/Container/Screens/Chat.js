import React, { useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useRef } from 'react'
import { BarIndicator } from 'react-native-indicators'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { globalStyle } from '../../utils/GlobalStyle'
import COLORS from '../../utils/colors'
import arrowLeft from '../../assets/images/arrowLeft.png'
import sendIcon from '../../assets/images/send.png'
import attach from '../../assets/images/paper_clip.png'
import ChatInput from '../../components/chat/ChatInput'
import Message from '../../components/chat/Message'
import fonts from '../../utils/fonts'
import { getMyDetail } from '../../APIs/api'
import ReportUserModal from '../../components/Common/ReportUserModal'
import { SvgXml } from 'react-native-svg'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useNavigation } from '@react-navigation/native'

const DEFAULT_IMAGE = require('../../assets/images/user.png')

const Chat = props => {
  const roomDetails = props.route.params.item
  const navigation = useNavigation()
  const theme = 'light'
  const insets = useSafeAreaInsets()
  const windowWidth = Dimensions.get('window').width

  // const pubnub = new PubNub({
  //   subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
  //   publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
  //   userId: `${props.route.params.myDetail.user.email}`,
  // });

  const { pubnub } = props.route.params

  const reportSheetRef = useRef()

  const [messages, setMessages] = useState([])
  const [lastMessageTimeToken, setLastMessageTimeToken] = useState('')
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingFile, setIsSendingFile] = useState(false)
  const [reportModal, setReportModal] = useState(false)

  const onReportPress = async () => {
    setReportModal(true)
  }

  useEffect(() => {
    getMessages()

    // // getDeviceId();
    // readAllMessages();
  }, [])


  useEffect(() => {
    pubnub.subscribe({
      channels: [roomDetails.channel]
    })
    return () => {
      pubnub.unsubscribe({
        channels: [roomDetails.channel]
      })
    }
  }, [pubnub])

  useEffect(() => {
    const listener = {
      message: messageEvent => {
        // showMessage(messageEvent.message.description);
       
        if (
          messageEvent.publisher != props.route.params.myDetail.user.email &&
          messageEvent.publisher != 'undefined'
        ) {
         
          setMessages(p => [
            {
              uuid: roomDetails.user_two_profile.user.id,
              message: {
                text: messageEvent.message.text
              }
            },
            ...p
          ])
        }
      },
      presence: presenceEvent => {
        // handle presence
      }
    }
    pubnub.addListener(listener)
    // cleanup listener
    return () => {
      pubnub.removeListener(listener)
    }
  }, [pubnub, setMessages])

  const readAllMessages = async () => {
    pubnub.setAllMessagesAsRead(
      {
        channel: [roomDetails.channel],
        messageAction: 'mark_seen',
        uuid: `${props.route.params.myDetail.user.email}`
        // userId: `${props.route.params.myDetail.user.email}`,
      },
      function (status, response) {
        if (status.error) {
          console.error(status)
          return
        }
      }
    )
  }

  const getMessages = async () => {
    pubnub.fetchMessages(
      {
        channels: [roomDetails.channel],
        // start: '16750646336112645',
        // end: '15343325004275466',
        reverse: false,
        count: 10
      },
      (status, response) => {
        setIsLoading(false)
        if (response) {
          if (response?.channels[roomDetails.channel][0]?.timetoken) {
            setLastMessageTimeToken(
              response?.channels[roomDetails.channel][0]?.timetoken
            )
          } else {
            setLastMessageTimeToken('')
          }

          
          setMessages(response.channels[roomDetails.channel].reverse())
          
        }
      }
    )
  }

  const loadMoreChats = async () => {
    pubnub.fetchMessages(
      {
        channels: [roomDetails.channel],
        start: lastMessageTimeToken,
        reverse: false
      },
      (status, response) => {
        let timeToken=lastMessageTimeToken
        if (response) {
          if (response?.channels[roomDetails.channel][0]?.timetoken) {
            setLastMessageTimeToken(
              response?.channels[roomDetails.channel][0]?.timetoken
            )
          } else {
            setLastMessageTimeToken('')
          }
          if (response.channels) {
            setMessages(p => timeToken?[
              ...p,
              ...response.channels[roomDetails.channel].reverse()
            ]:response.channels[roomDetails.channel].reverse())
          }
        }
      }
    )
  }

  const onSendMessage = useCallback(async () => {
    await pubnub.publish({
      channel: roomDetails.channel,
      message: {
        text: msg
      }
    })

    setMessages(p => [
      {
        uuid: roomDetails.user_one_profile.user.email,
        timetoken: Date.now() * 10000,
        message: {
          text: msg
        }
      },
      ...p
    ])

    setMsg('')
  }, [messages, msg, navigation])

  const onSendFile = useCallback(async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'any'
      // forceJpg: true,
    }).then(async image => {
      if (
        Platform.OS === 'ios' &&
        (image.filename.endsWith('.heic') || image.filename.endsWith('.HEIC'))
      ) {
        image.filename = `${image.filename.split('.')[0]}.JPG`
      }

      // if(image.filename && !image.filename.includes('video') && !image?.mime.includes('video'))
      // {
      setIsSendingFile(true)
      setMessages(p => [
        {
          uuid: roomDetails.user_one_profile.user.email,
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
        channel: roomDetails.channel,
        message: {
          text: 'file'
        },
        file: {
          uri: image.path,
          name: image?.filename ?? image?.mime.replace('/', '.'),
          mimeType: image.mime
        }
      })
      setIsSendingFile(false)
    })
  }, [isSendingFile, messages, navigation])

  const back = () => {
    props.navigation.goBack()
  }
  return (
    <View style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          globalStyle.innerContainer,
          {
            paddingHorizontal: 0,
            backgroundColor: 'white'
          }
        ]}
      >
        {/* ............header.......... */}
        <View
          style={[
            styles.header,
            { paddingTop: insets.top, height: 60 + insets.top }
          ]}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={back}
            activeOpacity={0.85}
          >
            <Image
              source={arrowLeft}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.userWrapper}>
            {roomDetails.user_two_profile.profile_photo ? (
              <View>
                <Image
                  // onLoad={() => setIsLoadingPic(false)}
                  // onLoadStart={() => setIsLoadingPic(true)}
                  // onLoadEnd={() => setIsLoadingPic(false)}
                  style={styles.avatar}
                  resizeMode={'cover'}
                  source={{
                    uri: roomDetails.user_two_profile.profile_photo
                  }}
                />

                {/* {isLoadingPic ? (
                <View
                  style={{
                    // position: 'absolute',

                    marginTop: -40,
                    marginRight: 12,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <BarIndicator size={20} color={COLORS.color14}></BarIndicator>
                </View>
              ) : null} */}
              </View>
            ) : (
              <Image
                resizeMode={'cover'}
                style={styles.avatar}
                source={DEFAULT_IMAGE}
              />
            )}

            <Text style={styles.username}>
              {roomDetails?.user_two_profile?.first_name
                ? roomDetails?.user_two_profile.first_name
                : roomDetails?.user_two_profile.user.username}
            </Text>
            <TouchableOpacity onPress={onReportPress}>
              <Image
                style={{ height: 20, width: 40 }}
                resizeMode="contain"
                source={require('../../assets/images/more.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={optionBtn}
            activeOpacity={0.85}>
            <Image
              source={option}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>

        {isLoading ? (
          <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
        ) : null}

        {/* <ChatInput
          userBlock={
            roomDetails.user_one_block ||
            roomDetails.user_two_block
          }
          setMessages={setMessages}
          messages={messages}
          user_two_detail={roomDetails.user_two_profile.user}
          user_one_detail={roomDetails.user_one_profile.user}
          chatChannel={roomDetails.channel}
          pubnub={pubnub}
          isFileSent={val => {
            setIsSendingFile(val)
          }}
        /> */}

        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -13 : 0}
        >
          <View style={styles.content}>
            <FlatList
              style={{ flex: 1, zIndex: 2 }}
              contentContainerStyle={{
                paddingHorizontal: '2%',
                zIndex: 3,
                // paddingBottom: 20,
                paddingTop: 32
              }}
              data={messages}
              extraData={messages}
              keyExtractor={(i, _i) => 'message' + _i}
              inverted={true}
              renderItem={({ item, index }) => {
                return (
                  <Message
                    length={messages.length}
                    index={index}
                    isFileSent={isSendingFile}
                    onPressVideo={() => getMessages()}
                    chatChannel={roomDetails.channel}
                    pubnub={pubnub}
                    mine={item.uuid == props.route.params.myDetail.user.email}
                    item={item}
                  ></Message>
                )
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreChats}
              onEndReachedThreshold={0.5}
            />
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingBottom:
                Platform.OS == 'ios'
                  ? insets.bottom - (windowWidth * 3) / 100
                  : 9,
              paddingVertical: 9,
              paddingHorizontal: 13
            }}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  width: '88%'
                }}
              >
                {/* --------------------------------- */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    borderRadius: Platform.OS === 'ios' ? 20 : 20,
                    backgroundColor: '#e9e9e9',
                    paddingHorizontal: 12,
                    paddingVertical: Platform.OS == 'ios' ? 10 : 0,
                    justifyContent: 'space-between',
                    maxHeight: (windowWidth * 35) / 100
                  }}
                >
                  <View
                    style={{
                      width: '88%',
                      justifyContent: 'center'
                    }}
                  >
                    <TextInput
                      placeholder={'write your msg here...'}
                      placeholderTextColor={'#515C6F'}
                      style={{
                        width: '100%',
                        color: COLORS.black,
                        fontSize: 13,
                        fontFamily: fonts.medium
                      }}
                      multiline
                      value={msg}
                      returnKeyType="next"
                      onChangeText={val => setMsg(val)}
                    />
                  </View>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      Keyboard.dismiss()
                      setTimeout(() => {
                        onSendFile()
                      }, 350)
                    }}
                    style={{
                      width: '10%',
                      paddingBottom: Platform.OS == 'ios' ? 2 : 10,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end'
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        height: windowWidth / 20,
                        borderRadius: (windowWidth * 20) / 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={attach}
                        style={{
                          width: (windowWidth * 4.4) / 100,
                          height: (windowWidth * 4.4) / 100
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  width: '12%',
                  alignItems: 'flex-end',
                  paddingBottom: 4
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: COLORS.color3,
                    height: windowWidth * 0.09,
                    marginBottom: Platform.OS === 'ios' ? 0.5 : 4,
                    width: '80%',
                    borderRadius: windowWidth * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  // disabled={
                  //   messageInput.trim().length <= 0 && attachment.length == 0
                  //     ? true
                  //     : messageInput.trim().length <= 0 && attachment.length > 0
                  //     ? false
                  //     : messageInput.trim().length > 0 || attachment.length > 0
                  //     ? false
                  //     : false
                  // }
                  onPress={() => {
                    onSendMessage()
                  }}
                >
                  <Image
                    source={sendIcon}
                    resizeMode="contain"
                    style={styles.sendbtnIcon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <ReportUserModal
        visible={reportModal}
        setVisible={setReportModal}
        userID={roomDetails.id}
        navigation={props.navigation}
      />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  content: {
    flex: 1,
    paddingHorizontal: 2
  },
  header: {
    flexDirection: 'row',
    // height: 50,

    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  backIcon: {
    width: 20
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.color11,
    marginRight: 12
  },
  username: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color3,
    width: '70%'
  },
  inputContainer: {
    borderRadius: 30,
    height: 45,
    flex: 1,
    backgroundColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  sendBtn: {
    width: 60,
    height: 45,
    backgroundColor: COLORS.color3,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendbtnIcon: {
    width: 17
  }
})
