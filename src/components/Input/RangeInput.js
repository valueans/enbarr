import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';

const RangeInput = ({
  title = 'input',
  onMinimumChange = () => {},
  onMaximumChange = () => {},
  minValue,
  maxValue,
  minPlaceholder,
  maxPlaceholder,
}) => {
  return (
    <View style={{marginVertical: 8}}>
      <ScreenTitle marginVertical={8} size={12}>
        {title}
      </ScreenTitle>
      <View style={styles.row}>
        <View style={[styles.container, styles.right]}>
          <View style={styles.inputContainer}>
            <View style={styles.box}>
              <Text style={styles.lable}>Min</Text>
            </View>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.input}
              onChangeText={text => onMinimumChange(text)}
              value={minValue}
              placeholder={minPlaceholder}></TextInput>
          </View>
        </View>
        <View style={[styles.container, styles.left]}>
          <View style={styles.inputContainer}>
            <View style={styles.box}>
              <Text style={styles.lable}>Max</Text>
            </View>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.input}
              onChangeText={text => onMaximumChange(text)}
              value={maxValue}
              placeholder={maxPlaceholder}></TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RangeInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  left: {
    paddingLeft: 4,
  },
  right: {
    paddingRight: 4,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',

    height: 60,
    borderRadius: 15,
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.color10,
  },
  lable: {
    color: COLORS.white,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  input: {
    paddingHorizontal: 12,
    color: COLORS.color3,
    fontFamily: fonts.regular,
    fontSize: 14,
    flex: 1,
  },
});
