import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { getNmberOfNotifications } from '../../APIs/api'
import COLORS from '../../utils/colors'
import fonts from '../../utils/fonts'
import { globalStyle } from '../../utils/GlobalStyle'
import notif from '../../assets/images/bell.png'
import settings from '../../assets/images/settings.png'
import filter from '../../assets/images/filter.png'
import search from '../../assets/images/search.png'
import backIcon from '../../assets/images/arrowLeft.png';

import ScreenTitle from '../Text/ScreenTitle'
import { getMyDetail } from '../../APIs/api'
import { BarIndicator } from 'react-native-indicators'

const DEFAULT_IMAGE = require('../../assets/images/user.png')

const HomeHeader = ({
  avatar,
  navigation,
  onChnageTextFunc,
  showLine1 = true,
  showLine2 = true,
  showLine3 = true,
  isBuyer = false,
  isSeller = false,
  setFilterItem,
  pubnub,
  numberOfNotif = 0,
  showBackButton=true
}) => {
  const [visible, setVisible] = useState(false)
  const [selcetedIndex, setSelcetedIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isBtnPress, setIsBtnPress] = useState(false)
  const [myLat, setMyLat] = useState(0)
  const [myLong, setMyLong] = useState(0)

  const goToPage = (Page, params = {}) => {
    navigation.navigate(Page, params)
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (myLat != 0 && myLong != 0 && isBtnPress) {
      goToPage('Seller', { myLat: myLat, myLong: myLong })
    }
  }, [myLat, myLong])
  // const getNotif = async () => {

  // };
  const menuItems = ['All', 'Last Day', 'Week', 'Month']

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings')
      })
    }
    const status = await Geolocation.requestAuthorization('always')

    if (status === 'granted') {
      return true
    }

    if (status === 'denied') {
      return false
    }

    if (status === 'disabled') {
      return false
    }

    return false
  }
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG
      )
    }

    return false
  }

  const getUserLocation = async () => {
    const hasPermission = await hasLocationPermission()
    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {
        setMyLat(position.coords.latitude)
        setMyLong(position.coords.longitude)
      })
    }
  }

  const aSellerPress = async () => {
    const hasPermission = await hasLocationPermission()
    if (!hasPermission) {
      Alert.alert(
        'Location Permission!',
        'Please allow location permission first',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            onPress: () => {
              Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
              });
            },
          },
        ],
        { cancelable: false }
      );
      return
    } else {
      if (myLat != 0 && myLong != 0) {
        goToPage('Seller', { myLat: myLat, myLong: myLong })
      } else {
        Geolocation.getCurrentPosition(async position => {
          setMyLat(position.coords.latitude)
          setMyLong(position.coords.longitude)
        })
      }
    }

    // // for testing purposes:
    //  // goToPage('RequestSubscribe');
    // } else if (data.promotion_adds <= 0) {
    //  //should go to sub page
    // goToPage('RequestSubscribe');
    // // goToPage('Seller');
    // }
  }

  return (
    <>
      {showLine1 ? (
        <View style={styles.headerContainer}>
          <View style={styles.flexRow}>
       {showBackButton&&    <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.headerBtn,{marginRight:16}]}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.btnIcon}
                source={backIcon}
                resizeMode="contain"
              />
            
            </TouchableOpacity>}
          <Pressable onPress={() => goToPage('MyProfile')}>
            
            <View style={styles.avatarContainer}>
              
              {avatar ? (
                <>
                  <Image
                    style={styles.avatar}
                    resizeMode="cover"
                    source={{ uri: avatar }}
                    onLoad={() => setIsImageLoading(true)}
                    onLoadStart={() => setIsImageLoading(true)}
                    onLoadEnd={() => setIsImageLoading(false)}
                  />
                  {isImageLoading ? (
                    <BarIndicator
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                      }}
                      color={COLORS.color3}
                      size={22}
                    ></BarIndicator>
                  ) : null}
                </>
              ) : (
                <Image
                  style={styles.avatar1}
                  resizeMode="cover"
                  source={DEFAULT_IMAGE}
                ></Image>
              )}
            </View>
          </Pressable>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.headerBtn}
              onPress={() => goToPage('Notification')}
            >
              <Image
                style={styles.btnIcon}
                source={notif}
                resizeMode="contain"
              />
              {numberOfNotif !== 0 && numberOfNotif ? (
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 12,
                    height: 12,
                    borderRadius: 10,
                    position: 'absolute',
                    top: -2,
                    right: -2
                  }}
                ></View>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.headerBtn, { marginLeft: 16 }]}
              onPress={() => goToPage('Settings')}
            >
              <Image
                style={styles.btnIcon}
                source={settings}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showLine2 ? (
        <View style={styles.headerContainer}>
          <ScreenTitle size={20}>You are...</ScreenTitle>
          <View style={[styles.row]}>
            <TouchableOpacity
              disabled={isBuyer}
              activeOpacity={0.8}
              style={[styles.hBtn, isBuyer ? styles.hSelectedBtn : {}]}
              onPress={() =>
                goToPage('Buyer', {
                  pubnub: pubnub,
                  myLat: myLat,
                  myLong: myLong
                })
              }
            >
              <Text
                style={[
                  styles.hBtnText,
                  isBuyer ? styles.hSelectedBtnText : {}
                ]}
              >
                A Buyer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isSeller}
              style={[
                styles.hBtn,
                isSeller ? styles.hSelectedBtn : {},
                { marginLeft: 8 }
              ]}
              onPress={() => aSellerPress()}
            >
              <Text
                style={[
                  styles.hBtnText,
                  isSeller ? styles.hSelectedBtnText : {}
                ]}
              >
                A Seller
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {showLine3 ? (
        <View style={[styles.row, { paddingVertical: 8 }]}>
          <View style={styles.inputContainer}>
            <Image
              source={search}
              resizeMode="contain"
              style={[styles.filterIcon, { width: 20, height: 20 }]}
            />
            <TextInput
              style={styles.input}
              onChangeText={e => onChnageTextFunc(e)}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.filterBtn} onPress={showMenu}>
              <Image
                source={filter}
                resizeMode="contain"
                style={styles.filterIcon}
              />
            </TouchableOpacity>
            <View
              style={{
                // height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
            >
              <Menu
                visible={visible}
                onRequestClose={hideMenu}
                style={{
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index.toString()}
                    onPress={() => {
                      setFilterItem(menuItems[index])
                      setSelcetedIndex(index)
                      hideMenu()
                    }}
                  >
                    <View style={styles.menuItem}>
                      <View style={styles.menueItemCircle}>
                        {selcetedIndex == index ? (
                          <View style={styles.menuItemSelect} />
                        ) : null}
                      </View>
                      <Text style={styles.menuItemText}>{item}</Text>
                    </View>
                  </MenuItem>
                ))}
              </Menu>
            </View>
          </View>
        </View>
      ) : null}
    </>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 16,
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 12
  },
  avatarContainer: {
    width: 50,
    height: 50,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'white',

    borderWidth: 2,
    borderColor: COLORS.color12
  },
  avatar1: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center'

    // borderWidth: 2,
    // borderColor: COLORS.color12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerBtn: {
    ...globalStyle.shadowBtn,
    ...globalStyle.center,
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.white
  },
  btnIcon: {
    width: 25,
    height: 25
  },
  hBtn: {
    ...globalStyle.center,
    ...globalStyle.shadowBtn,
    width: 100,
    height: 37,
    borderRadius: 20,
    backgroundColor: COLORS.white
  },
  hBtnText: {
    color: COLORS.color10,
    fontSize: 12
  },
  hSelectedBtn: {
    backgroundColor: COLORS.color3
  },
  hSelectedBtnText: {
    color: COLORS.white
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    flex: 1
  },
  filterBtn: {
    ...globalStyle.center,
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.color3,
    marginLeft: 8
  },
  filterIcon: {
    width: 25,
    height: 25
  },
  input: {
    flex: 1,
    color: COLORS.color3,
    fontSize: 13,
    fontFamily: fonts.regular,
    paddingLeft: 16
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  menueItemCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: COLORS.color10,
    borderWidth: 1,
    marginRight: 16
  },
  menuItemText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black
  },
  menuItemSelect: {
    width: 13,
    height: 13,
    backgroundColor: COLORS.color10,
    borderRadius: 20
  },
  flexRow:{flexDirection:"row"}
})
