import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import COLORS from '../../utils/colors';
import icon from '../../assets/images/chev_down.png';
import fonts from '../../utils/fonts';
const ICON_SIZE = 10;

const DropDown = props => {
  const {title, style, value, onPress = () => {}} = props;
  return (
    <View style={[{marginVertical: 8}, style]}>
      <ScreenTitle size={12} marginVertical={8}>
        {title}
      </ScreenTitle>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.btn}>
          <Text style={styles.value}>{value}</Text>
          <Image source={icon} style={styles.icon} resizeMode={'contain'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  value: {
    fontFamily: fonts.regular,
    fontWeight: '600',
    color: COLORS.color10,
    fontSize: 14,
  },
});
