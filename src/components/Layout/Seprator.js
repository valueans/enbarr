import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../utils/colors';

const Seprator = ({
  left = true,
  right = true,
  style,
  circleSize = 5,
  color = COLORS.color10,
}) => {
  return (
    <View style={[styles.row, style]}>
      {left ? (
        <View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: color,
            },
          ]}
        />
      ) : null}
      <View style={[styles.line, {backgroundColor: color}]} />
      {right ? (
        <View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: color,
            },
          ]}
        />
      ) : null}
    </View>
  );
};

export default Seprator;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    width: '100%',
    borderRadius: 1,
    backgroundColor: COLORS.color10,
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.color10,
  },
});
