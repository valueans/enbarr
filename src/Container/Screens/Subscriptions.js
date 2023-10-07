import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleLayout from '../../components/Layout/SimpleLayout'
import RoundBtn from '../../components/Button/RoundBtn'
import COLORS from '../../utils/colors'
import fonts from '../../utils/fonts'
import ScreenTitle from '../../components/Text/ScreenTitle'
import Seprator from '../../components/Layout/Seprator'
const { width, height } = Dimensions.get('screen')
import { BarIndicator } from 'react-native-indicators'
import useIAPStore from '../../hooks/useIAPStore'
import { getPlans } from '../../APIs/api'

const ITEM_WIDTH = width - width * 0.15
const ITEM_SPACE = 0
const ITEM_HEIGHT = height * 0.58

const Subscriptions = ({ navigation }) => {

  const [subs, setSubs] = useState([]);
  const [initIndex, setInitIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { fetchLoading, purchaseLoading, purchaseIAP, appSubscriptions, reedemPromocodeIAP } =
    useIAPStore()

  useEffect(() => {
    if (Platform.OS === 'android') getSubs();
  }, []);

  const getSubs = async () => {
    setLoading(true);
    const data = await getPlans();
    console.log('www', data);
    if (data.length > 1) {
      setInitIndex(1);
    }
    setSubs(data);
    setLoading(false);
  };

  const getStartedPress = async item => {
    console.log('pp');
    // console.log(item.id);
    // const data = await changeSubcriptionPlan(item.id);
    navigation.navigate('Purchases', {
      id: item.id,
      items: subs,
    });
    // if (data[0].code == 200) {
    //   navigation.navigate('Purchases', {
    //     id: item.id,
    //     items: subs,
    //   });
    // } else {
    //   Alert.alert('Server error', 'Please try again');
    // }
  };

  const renderItem = ({ item, index }) => {

    return (
      <View style={styles.itemContainer}>
        <ScreenTitle>{item.title}</ScreenTitle>
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: COLORS[`color${index + 1}`] }
          ]}
        >
          <ScreenTitle style={{ color: COLORS.white }}>
            {Platform.OS === 'ios' ? `${item.localizedPrice}` : `$${item.price}`}
          </ScreenTitle>
          <Text style={[styles.textItem, { color: COLORS.white }]}>
            {`${item.title} membership allows users to ${item.description}`}
          </Text>
          <Seprator style={{ marginVertical: 12 }} color={COLORS.white} />
          <Text style={[styles.textItem, { color: COLORS.white }]}>
            {`${item.title} membership package for individual horse owners and small sales business to showcase their horses for sale. Add videos, photos, description, message with potential buyers and more. ${item.description}`}
          </Text>
          <View style={{ flex: 1 }} />
          <RoundBtn
            style={{
              width: '50%'
            }}
            loading={purchaseLoading}
            onPress={() => {
              if (Platform.OS === 'ios') {
                purchaseIAP(item.productId)
              } else {
                getStartedPress(item)
              }
            }}
          >
            Get Started
          </RoundBtn>
        </View>
      </View>
    )
  }

  return (
    <SimpleLayout
      title="Subscriptions"
      showBackButton={false}
      paddingHorizontalContent={0}
      paddingHorizontal={21}
    >
      <View style={{ flex: 1 }}>
        {fetchLoading || loading ? (
          <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
        ) : Platform.OS === 'ios' && appSubscriptions.length == 0 ? (
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
        ) : Platform.OS === 'android' && subs.length === 0 ? (<View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: COLORS.color2, fontSize: 24 }}>
            No Subscriptions are found
          </Text>
        </View>) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            snapToInterval={width}
            data={Platform.OS === 'ios' ? appSubscriptions : subs}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            style={{ flexGrow: 0 }}
          />
        )}
      </View>
      {Platform.OS === 'ios' && <TouchableOpacity onPress={() => {
        reedemPromocodeIAP()
      }}><Text style={[styles.textItem, { color: COLORS.black, fontSize: 14, marginTop: 10 }]}>
          Do you have a promocode?
        </Text></TouchableOpacity>}
      <RoundBtn style={styles.btn} onPress={() => navigation.goBack()}>
        Close
      </RoundBtn>
    </SimpleLayout>
  )
}

export default Subscriptions

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    alignItems: 'center'
  },
  innerContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: ITEM_SPACE,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center'
  },
  btn: {
    width: width - 42,
    alignSelf: 'center',
    marginBottom: 30
  },
  textItem: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.color2,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginBottom: 12
  }
})
