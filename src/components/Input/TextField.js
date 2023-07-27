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

const TextField = ({
  title,
  style,
  onChangeText = e => {},
  optional = false,
  backgroundColor = COLORS.white,
  value,
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

      <View style={[styles.container, {backgroundColor}]}>
        <TextInput
          style={[styles.input, {backgroundColor}]}
          onChangeText={onChangeText}
          multiline
          value={value}></TextInput>
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    height: '100%',
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
