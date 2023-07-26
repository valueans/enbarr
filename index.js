/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {useEffect} from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import store, {persistor} from './src/redux/store';
import OneSignal from 'react-native-onesignal';
import {PersistGate} from 'redux-persist/integration/react';
import {Settings} from 'react-native-fbsdk-next';
import {sendPlayerIDToServer} from './src/APIs/api';
// persistor={persistor}
Settings.setAppID('1276833139846568');
Settings.initializeSDK();

const RNRedux = () => {
  useEffect(() => {
    // OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('c8e6ea02-a03d-42dd-8463-b8d0098bdc1a');

    OneSignal.promptForPushNotificationsWithUserResponse(res => {
      console.log('wwwwwwwwwww11111', res);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
