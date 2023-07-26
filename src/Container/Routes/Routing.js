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

const Stack = createStackNavigator();

const Routing = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Root"
        component={BottomTab}
        options={{headerShown: false, title: 'Home'}}
      />
      <Stack.Screen name="Buyer" component={Buyer} />
      <Stack.Screen name="Seller" component={Seller} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Subscriptions" component={Subscriptions} />
      <Stack.Screen name="RequestSubscribe" component={RequestSubscribe} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Purchases" component={Purchases} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="SwipingPage" component={SwipingPage} />
    </Stack.Navigator>
  );
};

export default Routing;

const styles = StyleSheet.create({});
