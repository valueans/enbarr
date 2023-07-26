import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import COLORS from '../../utils/colors';

import home from '../../assets/images/home.png';
import messages from '../../assets/images/messages.png';
import horse from '../../assets/images/horse.png';

const {width, height} = Dimensions.get('screen');

const CustomTab = props => {
  const Wrapper = ({children}) => {
    return Platform.OS == 'ios' ? (
      <BlurView
        style={styles.wrapperBlur}
        blurType="regular"
        blurAmount={2}
        blurRadius={2}>
        {children}
      </BlurView>
    ) : (
      <View style={styles.wrapperView}>{children}</View>
    );
  };

  const safeArea = useSafeAreaInsets();

  const buttons = [
    {
      name: 'Home',
      icon: home,
    },
    {
      name: 'Messages',
      icon: messages,
    },
    {
      name: 'Horses',
      icon: horse,
    },
  ];
  const goToPage = name => {
    props.navigation.navigate(name);
  };
  return (
    <View style={[styles.wrapper, {bottom: safeArea.bottom}]}>
      <Wrapper>
        <View style={styles.container}>
          {buttons.map((item, index) => (
            <TouchableOpacity
              key={'aa' + index.toString()}
              onPress={() => goToPage(item.name)}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Wrapper>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  wrapper: {
    width,
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  wrapperBlur: {
    width: '100%',
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  wrapperView: {
    width: '100%',
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  container: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.color10,
    borderRadius: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
