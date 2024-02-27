import React, { useEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatScreen from '../Tabs/Chat/ChatScreen';
import HorsesScreen from '../Tabs/Horses/HorsesScreen';
import HomeScreen from '../Tabs/Home/HomeScreen';
import TabBar from './Tabbar';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import COLORS from '../../utils/colors';
import CustomTabButton from './CustomTabButton';
import HomeIcon from './Icons/HomeIcon';
import MessageIcon from './Icons/MessageIcon';
import HorsesIcon from './Icons/HorsesIcon';
import { getMyDetail } from '../../APIs/api';
import PubNub from 'pubnub';
import HomeStack from './HomeStack';
const Tab = createBottomTabNavigator();

const BottomTab = props => {
  useEffect(() => {
    // configurePubnub();
  });

  // const configurePubnub = async () => {
  //   const data = await getMyDetail();
  //   console.log('hiiii', data);
  //   const pubnub = new PubNub({
  //     subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
  //     publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
  //     userId: `${data?.user?.email}`,
  //   });
  // };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: props => useMemo(() => <HomeIcon {...props} />, []),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatScreen}
        options={{
          tabBarIcon: props => useMemo(() => <MessageIcon {...props} />, [])
        }}
      />
      <Tab.Screen
        name="Horses"
        component={HorsesScreen}
        options={{
          tabBarIcon: props => useMemo(() => <HorsesIcon {...props} />, [])
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    bottom: Platform.OS == 'ios' ? Dimensions.get('window').height < 668 ? 25 : 13 : 0,
    right: -15,
    left: -15,
    height: 92,
    elevation: 0,
  },
});
export default BottomTab;
