import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Passcode from './AccountStackScreens/Passcode';
import {Text} from 'react-native';
import Welcome from './AccountStackScreens/Welcome';
import ForgotPassword from './AccountStackScreens/ForgotPassword';
import ResetPassword from './AccountStackScreens/ResetPassword';
import Terms from '../Screens/Terms';
import Privacy from '../Screens/Privacy';

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Welcome"
        component={Welcome}></Stack.Screen>

      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Passcode"
        component={Passcode}></Stack.Screen>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="ForgotPassword"
        component={ForgotPassword}></Stack.Screen>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}></Stack.Screen>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Terms"
        component={Terms}></Stack.Screen>
      <Stack.Screen
        options={{title: '', headerShown: false}}
        name="Privacy"
        component={Privacy}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AccountStack;
