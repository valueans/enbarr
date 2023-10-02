import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import SimpleLayout from '../../components/Layout/SimpleLayout'
import RoundBtn from '../../components/Button/RoundBtn'
import COLORS from '../../utils/colors'
import { packages } from '../../utils/data'
import fonts from '../../utils/fonts'
import ScreenTitle from '../../components/Text/ScreenTitle'
import Seprator from '../../components/Layout/Seprator'
const { width, height } = Dimensions.get('screen')
import tick from '../../assets/images/tick.png'
import wrong from '../../assets/images/wrong.png'
import { getPlans, changeSubcriptionPlan } from '../../APIs/api'
import { BarIndicator } from 'react-native-indicators'
import * as RNIap from 'react-native-iap'
import useIAPStore from '../../hooks/useIAPStore'
import { iosSubscriptionIDs } from '../../Constants/urls'

const ITEM_WIDTH = width - width * 0.15
const ITEM_SPACE = 0
const ITEM_HEIGHT = height * 0.58
const SPACE = (width * 0.15) / 2

const Subscriptions = ({ navigation }) => {
  const listRef = useRef(null)

  const {
    fetchLoading,
    purchaseLoading,
    purchaseIAP,
    getAppSubscriptions,
    appSubscriptions
  } = useIAPStore()

  const scrollX = useRef(new Animated.Value(0)).current
  const [loading, setLoading] = useState(false)
  const [subs, setSubs] = useState([])
  const [initIndex, setInitIndex] = useState(0)

  useEffect(() => {
    getAppSubscriptions()
  }, [])

  // const getBackgroundColorByIndex = index => {
  //   switch (index % 3) {
  //     case 0:
  //       return COLORS.color7
  //     case 1:
  //       return COLORS.color4
  //     case 2:
  //       return COLORS.color1
  //     default:
  //       return COLORS.color7
  //   }
  // }

  // const getTextColorByIndex = index => {
  //   switch (index % 3) {
  //     case 0:
  //       return COLORS.color2
  //     case 1:
  //       return COLORS.color2
  //     case 2:
  //       return COLORS.white
  //     default:
  //       return COLORS.color2
  //   }
  // }

  // const getSubs = async () => {
  //   setLoading(true)
  //   const data = await getPlans()
  //   if (data.length > 1) {
  //     setInitIndex(1)
  //   }
  //   setSubs(data)
  //   setLoading(false)
  // }

  // const renderItem = ({ item, index }) => {
  //   const inputRange = [
  //     (index - 1) * ITEM_WIDTH,
  //     index * ITEM_WIDTH,
  //     (index + 1) * ITEM_WIDTH
  //   ]
  //   const outputRange = [0.9, 1, 0.9]
  //   const scale = scrollX.interpolate({ inputRange, outputRange })

  //   return (
  //     <Animated.View>
  //       <ScreenTitle style={{ marginBottom: 32, alignSelf: 'center' }}>
  //         {item.title}
  //       </ScreenTitle>

  //       <Animated.View
  //         style={[
  //           styles.item,
  //           {
  //             backgroundColor: getBackgroundColorByIndex(index),
  //             transform: [{ scale }]
  //           }
  //         ]}
  //       >
  //         <ScreenTitle style={{ color: getTextColorByIndex(index) }}>
  //           ${item.price}
  //         </ScreenTitle>
  //         <Text
  //           style={[styles.textItem, { color: getTextColorByIndex(index) }]}
  //         >
  //           {item.description}
  //         </Text>
  //         <Seprator
  //           style={{ marginVertical: 12 }}
  //           color={getTextColorByIndex(index)}
  //         />
  //         <Text
  //           style={[styles.textItem, { color: getTextColorByIndex(index) }]}
  //         >
  //           {item.description_features}
  //         </Text>
  //         <View>
  //           {/* {item.features.map((itm, i) => (
  //           <View key={'feature_' + i.toString()} style={styles.fItem}>
  //             <Image
  //               source={itm.isAvailable ? tick : wrong}
  //               resizeMode="contain"
  //               style={styles.fImg}
  //             />
  //             <Text style={[styles.fText, {color: getTextColorByIndex(index)}]}>
  //               {itm.description}
  //             </Text>
  //           </View>
  //         ))} */}
  //         </View>
  //         <TouchableOpacity
  //           style={styles.btnItem}
  //           onPress={() => getStartedPress(item)}
  //         >
  //           <Text style={styles.btnText}>Get Started</Text>
  //         </TouchableOpacity>
  //       </Animated.View>
  //     </Animated.View>
  //   )
  // }

  // const getStartedPress = async item => {
  //   // console.log(item.id);
  //   // const data = await changeSubcriptionPlan(item.id);
  //   navigation.navigate('Purchases', {
  //     id: item.id,
  //     items: subs
  //   })
  //   // if (data[0].code == 200) {
  //   //   navigation.navigate('Purchases', {
  //   //     id: item.id,
  //   //     items: subs,
  //   //   });
  //   // } else {
  //   //   Alert.alert('Server error', 'Please try again');
  //   // }
  // }

  return (
    <SimpleLayout
      title="Subscriptions"
      showBackButton={false}
      paddingHorizontalContent={0}
      paddingHorizontal={21}
    >
      <View style={{ flex: 1 }}>
        {fetchLoading ? (
          <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
        ) : appSubscriptions.length == 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: COLORS.color2, fontSize: 24 }}>
              No Subscriptions are found
            </Text>
          </View>
        ) : (
          <>
            <ScreenTitle style={{ marginBottom: 32, alignSelf: 'center' }}>
              Premium
            </ScreenTitle>
            <View
              style={[
                styles.item,
                {
                  backgroundColor: COLORS.color4,
                  alignSelf: 'center'
                }
              ]}
            >
              <ScreenTitle style={{ color: COLORS.color2 }}>$12.99</ScreenTitle>
              <Text style={[styles.textItem, { color: COLORS.color2 }]}>
                {`Premium membership allows users to list up to 3 horses at a time.`}
              </Text>
              <Seprator style={{ marginVertical: 12 }} color={COLORS.color2} />
              <Text style={[styles.textItem, { color: COLORS.color2 }]}>
                {`Great membership package for individual horse owners and small sales business to showcase their horses for sale. Add videos, photos, description, message with potential buyers and more. List up to 3 horses at a time.`}
              </Text>
              <RoundBtn
                color={COLORS.black}
                style={styles.btnItem}
                loading={purchaseLoading}
                onPress={() => purchaseIAP(iosSubscriptionIDs[0])}
              >
                Get Started
              </RoundBtn>
            </View>
          </>
        )}
      </View>
      <RoundBtn style={styles.btn} onPress={() => navigation.goBack()}>
        Close
      </RoundBtn>
    </SimpleLayout>
  )

  // return (
  //   <SimpleLayout
  //     title="Subscriptions"
  //     showBackButton={false}
  //     paddingHorizontalContent={0}
  //     paddingHorizontal={21}
  //   >
  //     <View style={{ flex: 1 }}>
  //       {loading ? (
  //         <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
  //       ) : (
  //         <Animated.FlatList
  //           ref={listRef}
  //           data={subs}
  //           extraData={subs}
  //           horizontal
  //           pagingEnabled={true}
  //           renderItem={renderItem}
  //           snapToAlignment={'start'}
  //           snapToInterval={ITEM_WIDTH}
  //           decelerationRate={0}
  //           scrollEventThrottle={16}
  //           contentContainerStyle={{
  //             paddingLeft: SPACE,
  //             paddingRight: SPACE,
  //             alignItems: 'center'
  //             // borderColor: COLORS.color13
  //           }}
  //           contentInset={{
  //             position: 'absolute',
  //             top: 0,
  //             bottom: 0,
  //             left: SPACE / 2,
  //             Right: SPACE / 2
  //           }}
  //           showsHorizontalScrollIndicator={true}
  //           onScroll={Animated.event(
  //             [
  //               {
  //                 nativeEvent: { contentOffset: { x: scrollX } }
  //               }
  //             ],
  //             {
  //               useNativeDriver: true
  //             }
  //           )}
  //           getItemLayout={(data, index) => ({
  //             length: ITEM_WIDTH,
  //             offset: ITEM_WIDTH * index,
  //             index
  //           })}
  //           initialNumToRender={3}
  //           initialScrollIndex={initIndex}
  //         />
  //       )}
  //     </View>
  //     <RoundBtn style={styles.btn} onPress={() => navigation.goBack()}>
  //       Close
  //     </RoundBtn>
  //   </SimpleLayout>
  // )
}

export default Subscriptions

const styles = StyleSheet.create({
  btn: {
    width: width - 42,
    alignSelf: 'center',
    marginBottom: 30
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: ITEM_SPACE,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.regular
  },
  textItem: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.color2,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginBottom: 12
  },
  fItem: {
    marginBottom: 12,
    flexDirection: 'row'
  },
  fText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: COLORS.color2
  },
  fImg: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  btnItem: {
    alignSelf: 'center',
    marginTop: 20,
    width: ITEM_WIDTH / 2,
    height: 60,
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
    fontSize: 12
  }
})
