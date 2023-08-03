import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { clockRunning } from 'react-native-reanimated';
import { globalStyle } from '../../utils/GlobalStyle';
import COLORS from '../../utils/colors';

import arrowLeft from '../../assets/images/arrowLeft.png';
import option from '../../assets/images/option.png';
import fonts from '../../utils/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { profile_img } from '../../utils/data';
import Message from '../../components/chat/Message';
import ChatInput from '../../components/chat/ChatInput';
import Sheet from '../../components/Common/Sheet';

import { useRef } from 'react';

import { getMyDetail } from '../../APIs/api';

import * as PubNubKeys from '../Tabs/Chat/PubNubKeys';
import DeviceInfo from 'react-native-device-info';
import { BarIndicator } from 'react-native-indicators';
// import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import ReportUserModal from '../../components/Common/ReportUserModal';

// const groupChatChannel = 'group_chat';
// var deviceId = 'ChangeMe';
const DEFAULT_IMAGE = require('../../assets/images/user.png');
const Chat = props => {
  const currentChannel = props.route.params.item.channel;
  const theme = 'light';

  console.log('asdfasdffff', props.route.params.item.channel);

  // const pubnub = new PubNub({
  //   subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
  //   publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
  //   userId: `${props.route.params.myDetail.user.email}`,
  // });

  const { pubnub } = props.route.params;

  const safeArea = useSafeAreaInsets();
  const reportSheetRef = useRef();

  const [messages, setMessages] = useState([]);
  const [text, onChangeText] = useState([]);
  const [myUUId, setMyUUId] = useState('');
  const [lastMessageTimeToken, setLastMessageTimeToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [reportModal, setReportModal] = useState(false);

  const onReportPress = async () => {
    setReportModal(true);
  };

  useEffect(() => {
    // async function getDeviceId() {
    //   deviceId = await DeviceInfo.getUniqueId();
    //   pubnub.setUUID(deviceId);

    //   pubnub.objects.setMemberships({
    //     channels: [groupChatChannel],
    //   });

    //   pubnub.subscribe({channels: [groupChatChannel], withPresence: true});
    // }
    setIsLoading(true);
    setLastMessageTimeToken('');
    getMyDet();
    getMessages();
    setIsLoading(false);
    // // getDeviceId();
    // readAllMessages();
  }, []);

  useEffect(() => {
    // subscribe to a channel
    pubnub.subscribe({
      channels: [props.route.params.item.channel],
    });
    // cleanup subscription
    return () => {
      pubnub.unsubscribe({
        channels: [props.route.params.item.channel],
      });
    };
  }, [pubnub]);

  useEffect(() => {
    const showMessage = msg => {
      setMessages(messages => [...messages, msg]);
    };

    // add listener
    const listener = {
      message: messageEvent => {
        // showMessage(messageEvent.message.description);
        console.log(
          'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
          messageEvent.publisher,
          props.route.params.myDetail.user.email,
        );
        if (
          messageEvent.publisher != props.route.params.myDetail.user.email &&
          messageEvent.publisher != 'undefined'
        ) {
          console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', messageEvent);
          setMessages(p => [
            {
              uuid: props.route.params.item.user_two_profile.user.id,
              message: {
                text: messageEvent.message.text,
              },
            },
            ...p,
          ]);
        }
      },
      presence: presenceEvent => {
        // handle presence
      },
    };
    pubnub.addListener(listener);
    // cleanup listener
    return () => {
      pubnub.removeListener(listener);
    };
  }, [pubnub, setMessages]);

  const readAllMessages = async () => {
    pubnub.setAllMessagesAsRead(
      {
        channel: [props.route.params.item.channel],
        messageAction: 'mark_seen',
        uuid: `${props.route.params.myDetail.user.email}`,
        // userId: `${props.route.params.myDetail.user.email}`,
      },
      function (status, response) {
        if (status.error) {
          console.error(status);
          return;
        }
      },
    );
  };

  const getMyDet = async () => {
    const data = await getMyDetail();
    // console.log('aaaaab', data.user.id);
    setMyUUId(data.user.id);
  };

  const getMessages = async () => {
    pubnub.fetchMessages(
      {
        channels: [props.route.params.item.channel],
        // start: '16750646336112645',
        // end: '15343325004275466',
        reverse: false,
        count: 10,
      },
      (status, response) => {
        if (response) {
          if (
            response?.channels[props.route.params.item.channel][0]?.timetoken
          ) {
            setLastMessageTimeToken(
              response?.channels[props.route.params.item.channel][0]?.timetoken,
            );
          } else {
            setLastMessageTimeToken('');
          }

          console.log(
            'fucking Time',
            response.channels[props.route.params.item.channel],
          );
          setMessages(
            response.channels[props.route.params.item.channel].reverse(),
          );
        }
      },
    );
  };

  const loadMoreChats = async () => {
    pubnub.fetchMessages(
      {
        channels: [props.route.params.item.channel],
        start: lastMessageTimeToken,
        reverse: false,
      },
      (status, response) => {
        if (response) {
          if (
            response?.channels[props.route.params.item.channel][0]?.timetoken
          ) {
            setLastMessageTimeToken(
              response?.channels[props.route.params.item.channel][0]?.timetoken,
            );
          } else {
            setLastMessageTimeToken('');
          }
          // setMessages(
          //   response.channels[props.route.params.item.channel].reverse(),
          // );
          // console.log('asdfasdfasdf', response);
          if (response.channels) {
            setMessages(p => [
              ...p,
              ...response.channels[props.route.params.item.channel].reverse(),
            ]);
          }
        }
      },
    );
  };

  const back = () => {
    props.navigation.goBack();
  };
  const optionBtn = () => {
    reportSheetRef.current.snapToIndex(0);
  };



  return (
    <View style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          globalStyle.innerContainer,
          {
            paddingHorizontal: 0,
            backgroundColor: 'white',
          },
        ]}>
        {/* header */}
        <View
          style={[
            styles.header,
            { paddingTop: safeArea.top, height: 60 + safeArea.top },
          ]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={back}
            activeOpacity={0.85}>
            <Image
              source={arrowLeft}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.userWrapper}>
            {props.route.params.item.user_two_profile.profile_photo ? (
              <View >
                <Image
                  // onLoad={() => setIsLoadingPic(false)}
                  // onLoadStart={() => setIsLoadingPic(true)}
                  // onLoadEnd={() => setIsLoadingPic(false)}
                  style={styles.avatar}
                  resizeMode={'cover'}
                  source={{
                    uri: props.route.params.item.user_two_profile.profile_photo,
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

            {/* <Image
              style={styles.avatar}
              resizeMode={'cover'}
              source={{
                uri: props.route.params.item.user_two_profile.profile_photo,
              }}
            /> */}
            <Text style={styles.username}>
              {props.route.params.item?.user_two_profile?.first_name
                ? props.route.params.item?.user_two_profile.first_name
                :
                props.route.params.item?.user_two_profile.user.username}
            </Text>
            <TouchableOpacity onPress={onReportPress}>
              <Image style={{ height: 20, width: 40 }} resizeMode='contain' source={require('../../assets/images/more.png')} />
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
        <View style={{ flex: 1 }}>
          <FlatList
            inverted={true}
            data={messages}
            extraData={messages}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{
              paddingTop: 36,
              paddingBottom: 20,
            }}
            onEndReached={loadMoreChats}
            onEndReachedThreshold={0}
            showsVerticalScrollIndicator={false}
            renderItem={(itemm, index) => {
              return (
                <Message
                  chatChannel={props.route.params.item.channel}
                  pubnub={pubnub}
                  mine={
                    itemm.item.uuid == props.route.params.myDetail.user.email
                  }
                  item={itemm}></Message>
              );
            }}
          />
        </View>

        <ChatInput
          userBlock={props.route.params.item.user_one_block || props.route.params.item.user_two_block}
          setMessages={setMessages}
          messages={messages}
          user_two_detail={props.route.params.item.user_two_profile.user}
          user_one_detail={props.route.params.item.user_one_profile.user}
          chatChannel={props.route.params.item.channel}
          pubnub={pubnub}
        />
        <Sheet ref={reportSheetRef} index={-1} pressBehavior="close">
          <Text style={{ margin: 100 }}>HI</Text>
        </Sheet>
      </View>
      <ReportUserModal
        visible={reportModal}
        setVisible={setReportModal}
        userID={props.route.params.item.id}
        navigation={props.navigation}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
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
      height: 2,
    },
  },
  backIcon: {
    width: 20,
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.color11,
    marginRight: 12,
  },
  username: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color3,
    width: '70%'
  },
});
