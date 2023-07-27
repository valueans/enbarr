import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
const TextButton = ({
  style = {},
  textStyle = {},
  children,
  onPress = () => {},
  backgroundColor = COLORS.white,
  color = COLORS.color10,
  RenderIcon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={[styles.btn, {backgroundColor}, style]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {RenderIcon}
        <Text style={[styles.text, {color}, textStyle]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  btn: {
    width: 150,
    // flex: 1,

    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.white,
  },
});
