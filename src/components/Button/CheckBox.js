import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const CheckBox = ({value, onChange = e => {}}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    onChange(!isChecked);
    setIsChecked(x => !x);
  };
  return (
    <TouchableOpacity style={styles.box} onPress={handleChecked}>
      {isChecked ? <View style={styles.checked} /> : null}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  box: {
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
  },
  checked: {
    width: 8,
    height: 8,

    backgroundColor: 'white',

    borderRadius: 1,
  },
});
