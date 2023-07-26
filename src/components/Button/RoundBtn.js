import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
import {BarIndicator} from 'react-native-indicators';
const RoundBtn = ({
  style = {},
  textStyle = {},
  children,
  onPress = () => {},
  backgroundColor = COLORS.color10,
  color = COLORS.white,
  RenderIcon,
  loading = false,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      disabled={disabled}
      style={[styles.btn, {backgroundColor}, style]}
      onPress={onPress}>
      {loading ? (
        <BarIndicator size={20} color={color}></BarIndicator>
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {RenderIcon}
          <Text style={[styles.text, {color}, textStyle]}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    // flex: 1,

    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.white,
  },
});
