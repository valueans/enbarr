import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import COLORS from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Favorite from './Tabs/Favorite';
import MyHorses from './Tabs/MyHorses';
import ScreenTitle from '../../../components/Text/ScreenTitle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import arrowLeft from '../../../assets/images/arrowLeft.png';
const { width, height } = Dimensions.get('screen');

const Tab = createMaterialTopTabNavigator();
const HorsesScreen = props => {
  const safeArea = useSafeAreaInsets();
  console.log('qqqqqq', props?.route?.params?.from);
  const [from, setFrom] = useState(props?.route?.params?.from);
  useEffect(() => {
    // setFrom(undefined);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: safeArea.top,
      }}>
      <TouchableOpacity
        style={{ marginLeft: 10, marginBottom: 10 }}
        onPress={() => {
          console.log();
          if (from == undefined) {
            props.navigation.navigate('Home');
          } else if (from == 'notif') {
            props.navigation.navigate('Notification');
          }
        }}>
        <Image source={arrowLeft} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
      <ScreenTitle style={{ marginLeft: 21 }}>My horses</ScreenTitle>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName={'MyHorses'}
          screenOptions={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,

            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          }}>
          <Tab.Screen
            name="Favorite"
            initialParams={{}}
            component={Favorite}
            options={{ title: 'Favorite' }}
          />
          <Tab.Screen
            name="MyHorses"
            component={MyHorses}
            options={{ title: 'My horses' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 15,
    fontFamily: fonts.regular,
    textTransform: 'none',
    color: COLORS.color10,
  },
  tabBarIndicatorStyle: {
    backgroundColor: COLORS.color10,
    borderRadius: 2,
    height: 4,
    bottom: -2,
    width: (width - 48) / 2,
  },
  tabBarIndicatorContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.color14,
    marginHorizontal: 12,
    width: width - 24,
  },
});

export default HorsesScreen;
