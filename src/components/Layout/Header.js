import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import backIcon from '../../assets/images/arrowLeft.png';

const Header = ({navigation, title}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.row}>
      <ScreenTitle size={17}>{title}</ScreenTitle>
      <TouchableOpacity onPress={goBack} style={styles.btn}>
        <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'relative',
  },
  backIcon: {
    width: 18,
    height: 18,
  },
  btn: {
    position: 'absolute',
    left: -10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
