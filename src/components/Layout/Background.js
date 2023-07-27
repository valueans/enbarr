import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import bg from '../../assets/images/home_bg.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Background = props => {
  const {opacity = 1} = props;

  const safeArea = useSafeAreaInsets();

  return (
    <ImageBackground
      source={bg}
      style={[styles.container, {opacity, paddingTop: safeArea.top}]}
      resizeMode="contain">
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      {props.children}
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f3f2',
  },
});
