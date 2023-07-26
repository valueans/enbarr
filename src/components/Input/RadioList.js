import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';
import {forwardRef, useImperativeHandle} from 'react';

const RadioList = forwardRef(
  (
    {
      t = '',
      title = 'default',
      list = [],
      direction = ['row' | 'column'],
      onChange = data => {},
      setSelectedIndex,
      selectedIndex,
    },
    ref,
  ) => {
    // const [selectedIndex, setSelectedIndex] = useState(null);

    const clear = () => {
      setSelectedIndex(null);
    };

    useImperativeHandle(
      ref,
      () => ({
        clear,
      }),
      [clear],
    );
    return (
      <View style={{marginVertical: 8}}>
        <ScreenTitle size={12} marginVertical={4}>
          {title}
        </ScreenTitle>
        <View style={[direction == 'row' ? styles.row : styles.column]}>
          {list.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                console.log(index, list[index]);
                setSelectedIndex(index);
                onChange(list[index]);
              }}
              key={item}>
              <View style={styles.itemContainer}>
                <View style={styles.circle}>
                  <View
                    style={[
                      styles.innerCircle,
                      {display: selectedIndex == index ? 'flex' : 'none'},
                    ]}
                  />
                </View>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  },
);

export default RadioList;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  column: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  circle: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: COLORS.color3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.color3,
  },
  itemText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    fontWeight: '600',
    color: COLORS.color10,
    marginLeft: 8,
  },
});
