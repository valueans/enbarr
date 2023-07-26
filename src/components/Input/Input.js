import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import COLORS from '../../utils/colors';
import icon from '../../assets/images/chev_down.png';
import fonts from '../../utils/fonts';
const ICON_SIZE = 10;

const Input = ({
  title,
  style,
  onChangeText = e => {},
  optional = false,
  backgroundColor = COLORS.white,
  keyboardType = 'default',
  ...props
}) => {
  return (
    <View style={[{marginVertical: 8}, style]}>
      <View style={styles.row}>
        <ScreenTitle size={12} marginVertical={8}>
          {title}
        </ScreenTitle>
        {optional ? (
          <Text style={styles.textOptional}>Optional</Text>
        ) : (
          <View />
        )}
      </View>

      <View style={[styles.btn, {backgroundColor}]}>
        <TextInput
          {...props}
          style={[styles.input, {backgroundColor}]}
          onChangeText={onChangeText}
          autoCapitalize={'none'}
          keyboardType={keyboardType}></TextInput>
      </View>
    </View>
  );
};

export default Input;

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
  input: {
    flex: 1,
    // paddingHorizontal: 16,
    color: COLORS.color10,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textOptional: {
    fontSize: 10,
    fontFamily: fonts.light,
    fontWeight: '400',
    color: COLORS.color18,
  },
});
