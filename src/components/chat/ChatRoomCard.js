import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  NativeModules
} from 'react-native'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import COLORS, { ColorShade } from '../../utils/colors'
import fonts from '../../utils/fonts'
import { useNavigation } from '@react-navigation/native'
import { BarIndicator } from 'react-native-indicators'
import { globalStyle } from '../../utils/GlobalStyle'
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux'

const DEFAULT_IMAGE = require('../../assets/images/user.png')

const ChatRoomCard = ({ pubnub, myDetail, item, index }) => {
  const [isOnline, setIsOnline] = useState(false)
  const [isLoadingPic, setIsLoadingPic] = useState(false)

  const navigation = useNavigation()
  const { userDetail } = useSelector(state => state.userDetail)
  useEffect(() => {
    checkOnlineStatus()
  }, [])

  const styles = useMemo(() => {
    return StyleSheet.create({
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: 21
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: COLORS.color19,
        marginRight: 12
      },
      contentContainer: {
        flex: 1
      },
      username: {
        fontFamily: fonts.medium,
        fontWeight: '600',
        color: COLORS.color10,
        fontSize: 15
      },
      text: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        color: COLORS.color10,
        fontSize: 12
      },
      infoContainer: {
        // width: 60,
        alignItems: 'center'
      },
      time: {
        fontFamily: fonts.light,
        fontSize: 12,
        color: COLORS.color13
      },
      badge: {
        ...globalStyle.center,
        width: 20,
        height: 20,
        backgroundColor: COLORS.red1,
        borderRadius: 10,
        marginTop: 8
      },
      badgeText: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: COLORS.white,
        fontWeight: '600'
      },
      horseImage:{
        width: 50,
        height: 50,
        borderRadius: 5,
        resizeMode: 'cover',
      }
    })
  }, [])
  const checkOnlineStatus = useCallback(async () => {
    const response = await pubnub.hereNow({
      channels: [item.channel],
      includeUUIDs: true,
      includeState: true
    })

    if (response.channels[item.channel].occupancy == 0) {
      setIsOnline(false)
    } else {
      setIsOnline(true)
    }
  }, [])
  const onHorsePhotoPress=()=>
  navigation.navigate('Details', {
    from: 'map',
    id: item?.horse_add?.id,
    item: {
      id: item?.horse_add?.id,
      user_location: {
        coordinates: ["", ""]
      }
    },
    pubnub: pubnub
  })
   
  

  return (
    <TouchableHighlight
      underlayColor={COLORS.color11}
      onPress={() => {
        navigation.push('Chat', {
          item: item,
          myDetail: myDetail,
          pubnub: pubnub
        })
      }}
    >
      <View style={styles.itemContainer}>
        {isOnline ? (
          <View
            style={{
              backgroundColor: 'green',
              position: 'absolute',
              height: 15,
              width: 15,
              borderRadius: 10,
              bottom: 1,
              left: '19%',
              zIndex: 100
            }}
          ></View>
        ) : null}

        {item?.user_two_profile?.profile_photo ? (
          <View>
            <FastImage
              onLoad={() => setIsLoadingPic(false)}
              onLoadStart={() => setIsLoadingPic(true)}
              onLoadEnd={() => setIsLoadingPic(false)}
              style={styles.avatar}
              source={{
                uri: item?.user_two_profile?.profile_photo
              }}
            />
          </View>
        ) : (
          <Image style={styles.avatar} source={DEFAULT_IMAGE} />
        )}
 
        <View style={styles.contentContainer}>
          <Text style={styles.username}>
            {item?.user_two_profile?.first_name
              ? item?.user_two_profile.first_name
              : item?.user_two_profile.user.username}
          </Text>
          {item?.last_message?.Messages && (
            <Text style={styles.text} numberOfLines={1}>
              {item?.last_message?.Messages}
            </Text>
          )}
         
        </View>
        {item?.horse_add?.images &&<TouchableOpacity onPress={onHorsePhotoPress}>
        <FastImage
              style={styles.horseImage}
              source={{
                uri: item?.horse_add?.images,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
        </TouchableOpacity>}
        {/* <View style={styles.infoContainer}> */}
          {/* <Text style={styles.time}>11:02pm</Text> */}
          {/* {unreadNumList?.channels?.[item?.channel] > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {unreadNumList?.channels?.[item?.channel]}
              </Text>
            </View>
          ) : null} */}
        {/* </View> */}
      </View>
    </TouchableHighlight>
  )
}

export default ChatRoomCard
