import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../utils/GlobalStyle';
import Header from '../../components/Layout/Header';
import Input from '../../components/Input/Input';
import TextField from '../../components/Input/TextField';
import RoundBtn from '../../components/Button/RoundBtn';
import COLORS from '../../utils/colors';
import {packages} from '../../utils/data';
import fonts from '../../utils/fonts';
import cart from '../../assets/images/cart.png';
import TextButton from '../../components/Button/TextButton';

import {
  CardField,
  useStripe,
  CardForm,
  useConfirmPayment,
  StripeProvider,
  usePaymentSheet,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';
import {
  getANewSetupIntent,
  getMyCardDetail,
  changeSubcriptionPlan,
} from '../../APIs/api';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = (width - 42 - 16) / 3;
const Purchases = ({navigation, route}) => {
  const {id, items} = route.params;

  const {confirmSetupIntent, loading} = useConfirmSetupIntent();
  const {initPaymentSheet, presentPaymentSheet} = usePaymentSheet();

  useEffect(async () => {
    const data = await getMyCardDetail();
    console.log(data);
    setLast4Digits(data[1].last_4);
    setCardNumber(`**** **** **** ${data[1].last_4}`);
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(id);
  const [subs, setSubs] = useState(items);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cardDetails, setCardDetails] = useState({});
  const [last4Digits, setLast4Digits] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiration, setExpiration] = useState();

  const getBackgroundColorByIndex = index => {
    switch (index % 3) {
      case 0:
        return COLORS.color7;
      case 1:
        return COLORS.color4;
      case 2:
        return COLORS.color1;
      default:
        return COLORS.color7;
    }
  };
  const getTextColorByIndex = index => {
    switch (index % 3) {
      case 0:
        return COLORS.color2;
      case 1:
        return COLORS.color2;
      case 2:
        return COLORS.white;
      default:
        return COLORS.color2;
    }
  };
  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => changePlanPressed(item, index)}
        style={{
          marginRight: 8,
          display: selectedIndex == item.id ? 'flex' : 'none',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.item,
            {backgroundColor: getBackgroundColorByIndex(index)},
          ]}>
          {/* <View style={styles.circle}>
            {selectedIndex == item.id ? <View style={styles.selected} /> : null}
          </View> */}
          <Text style={[styles.itemName, {color: getTextColorByIndex(index)}]}>
            {item.title}
          </Text>
          <Text style={[styles.itemPrice, {color: getTextColorByIndex(index)}]}>
            ${item.price}
          </Text>
          <Text style={[styles.itemName, {color: getTextColorByIndex(index)}]}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const changePlanPressed = async (item, index) => {
    const data = await changeSubcriptionPlan(item.id);
    if (data[0].code == 200) {
      setSelectedIndex(item.id);
    } else {
      Alert.alert('Server error', 'Please try again');
    }

    console.log(item, index);
  };

  const handlePayPress = async () => {
    //get payment intent
    const data = await getANewSetupIntent();
    const {error, setupIntent} = await confirmSetupIntent(
      data[1].setupIntent.toString(),
      {
        paymentMethodType: 'Card',
      },
      {},
    );

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      // console.log(error);
    } else if (setupIntent) {
      Alert.alert(
        'Success',
        `Setup intent created. Intent status: ${setupIntent.status}`,
      );
      Geolocation.getCurrentPosition(async position => {
        navigation.navigate('Seller', {
          myLat: position.coords.latitude,
          myLong: position.coords.longitude,
        });
      });

      console.log(setupIntent);
    }
  };

  const payTest = async () => {
    await handlePayPress();
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  return (
    <SafeAreaView
      style={[globalStyle.container, {backgroundColor: COLORS.white}]}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={globalStyle.innerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header title="Subscription" navigation={navigation} />

            <View style={styles.itemContainer}>
              <FlatList
                data={items}
                extraData={items}
                renderItem={renderItem}
                horizontal
                contentContainerStyle={{paddingVertical: 4}}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={width / 3}
              />
            </View>

            {/* <RoundBtn
              style={{marginTop: 12}}
              RenderIcon={
                <Image
                  style={styles.iconImg}
                  resizeMode="contain"
                  source={cart}
                />
              }>
              Add card
            </RoundBtn> */}

            {/* <View style={styles.inputContainer}>
              <Input title="Card number" backgroundColor={COLORS.color11} />
              <View style={styles.row}>
                <Input
                  title="Expiration date"
                  backgroundColor={COLORS.color11}
                  style={{flex: 1, marginRight: 6}}
                />
                <Input
                  title="CVV"
                  backgroundColor={COLORS.color11}
                  style={{flex: 1, marginLeft: 6}}
                />
              </View>
              <Input
                title="Card holder name "
                backgroundColor={COLORS.color11}
              />
            </View> */}

            <CardForm
              postalCodeEnable={false}
              onFormComplete={cardDetails => {
                console.log('card details', cardDetails);
                setCardDetails(cardDetails);
              }}
              style={{
                height: 300,
                marginTop: 50,
              }}
              // cardStyle={{
              //   borderRadius: 500,
              //   borderWidth: 50,
              //   borderColor: 'red',
              //   backgroundColor: 'red',

              //   backgroundColor: COLORS.color11,
              //   textAlign: 'center',
              //   textColor: 'pink',
              // }}
            />

            {/* <RoundBtn
              style={[globalStyle.btnType2, {marginTop: 48}]}
              onPress={async () => await changeSubcriptionPlan(2)}
              color={COLORS.color10}>
              Edit
            </RoundBtn> */}

            <RoundBtn
              style={styles.btn}
              onPress={() => {
                handlePayPress();
              }}>
              Submit Card Details
            </RoundBtn>
            <TextButton
              onPress={() => {
                navigation.goBack();
              }}>
              Cancel
            </TextButton>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Purchases;

const styles = StyleSheet.create({
  btn: {
    // marginTop: 50,
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 10,
    padding: 10,
    justifyContent: Platform.OS == 'ios' ? 'flex-end' : 'space-between',
  },
  circle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  itemName: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color10,
    fontSize: 10,
    marginBottom: 0,
    marginTop: 0,
    // lineHeight: 0,
  },
  itemPrice: {
    fontFamily: fonts.regular,
    fontWeight: '600',
    color: COLORS.color10,
    fontSize: 28,
    marginBottom: 0,
    marginTop: -5,
    // lineHeight: 0,
  },
  iconImg: {
    width: 20,
    marginRight: 8,
  },
  inputContainer: {
    paddingTop: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
