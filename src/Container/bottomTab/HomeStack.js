import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTab from '../bottomTab/BottomTab';
import {
  Buyer,
  Seller,
  Details,
  Settings,
  MyProfile,
  Terms,
  Privacy,
  Feedback,
  ChangePassword,
  Subscriptions,
  RequestSubscribe,
  Notification,
  Purchases,
  Chat,
  SwipingPage,
} from '../Screens';
import HomeScreen from '../Tabs/Home/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Buyer" component={Buyer} />
      <Stack.Screen name="Seller" component={Seller} />
    </Stack.Navigator>
  );
};

export default HomeStack;
