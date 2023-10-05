import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleLayout from '../../components/Layout/SimpleLayout'
import RoundBtn from '../../components/Button/RoundBtn'
import COLORS from '../../utils/colors'
import fonts from '../../utils/fonts'
import ScreenTitle from '../../components/Text/ScreenTitle'
import Seprator from '../../components/Layout/Seprator'
const { width, height } = Dimensions.get('screen')
import { BarIndicator } from 'react-native-indicators'
import useIAPStore from '../../hooks/useIAPStore'

const ITEM_WIDTH = width - width * 0.15
const ITEM_SPACE = 0
const ITEM_HEIGHT = height * 0.58

const Subscriptions = ({ navigation }) => {
  const { fetchLoading, purchaseLoading, purchaseIAP, appSubscriptions } =
    useIAPStore()

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
            {`$${item.price}`}
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
            onPress={() => purchaseIAP(item.productId)}
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
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            snapToInterval={width}
            data={appSubscriptions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            style={{ flexGrow: 0 }}
          />
        )}
      </View>
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
