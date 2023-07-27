import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenTitle from '../Text/ScreenTitle';
import COLORS from '../../utils/colors';
import fonts from '../../utils/fonts';

import icon from '../../assets/images/add_white.png';
import deleteIcon from '../../assets/images/delete_black.png';
import {addKeyword} from '../../APIs/api';
import {forwardRef, useImperativeHandle} from 'react';

const MultipleInput = forwardRef(
  ({title = 'defalut', onChange = keywords => {}, list}, ref) => {
    const [input, setInput] = useState('');
    const [keywords, setKeywords] = useState(list);

    useEffect(() => {
      setKeywords(list);
    }, [list]);

    const clear = () => {
      setInput('');
      setKeywords([]);
    };
    useImperativeHandle(
      ref,
      () => ({
        clear,
      }),
      [clear],
    );

    const addToList = async () => {
      if (input && input != ' ') {
        const data = await addKeyword(input);
        console.log('asdfasdfasdfsf', data);
        if (data[0].code == 201) {
          setInput('');
          console.log('asdfasdf', data[1]);
          setKeywords(prev => [...prev, data[1]]);
          // console.log(data[1]);
          onChange([...keywords, data[1]]);
        }
      }
    };
    const deleteKeyword = keyword => {
      const filtered = keywords.filter(item => item != keyword);
      setKeywords(filtered);
      onChange(filtered);
    };
    return (
      <View style={{marginVertical: 8}}>
        <ScreenTitle marginVertical={8} size={12}>
          {title}
        </ScreenTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => setInput(text)}
            value={input}></TextInput>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={addToList}>
            <Image source={icon} style={styles.img} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.keywordContainer}>
          {keywords?.map((item, index) => (
            <View key={'keywords' + index} style={styles.keyword}>
              <Text>{item.keyword}</Text>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => deleteKeyword(item)}>
                <Image source={deleteIcon} style={styles.kImg} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  },
);

export default MultipleInput;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 8,
    width: '100%',
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    color: COLORS.color3,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.color10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 25,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 12,
  },
  keyword: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.color15,
    borderWidth: 1,
    borderColor: COLORS.color16,
    marginRight: 8,
    marginBottom: 8,
  },
  kImg: {
    width: 15,
    height: 15,
  },
});
