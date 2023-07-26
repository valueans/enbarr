import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {globalStyle} from '../../utils/GlobalStyle';

import backIcon from '../../assets/images/arrowLeft.png';
import ScreenTitle from '../../components/Text/ScreenTitle';
import COLORS from '../../utils/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SimpleLayout = ({
  title,
  navigation,
  children,
  paddingHorizontal = 0,
  paddingHorizontalContent = 21,
  showBackButton = true,
}) => {
  const goBack = () => {
    navigation.goBack();
  };
  const safeArea = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: COLORS.white, paddingTop: safeArea.top},
      ]}>
      <View
        style={[
          styles.container,
          {paddingHorizontal: paddingHorizontalContent},
        ]}>
        {showBackButton ? (
          <View
            style={[
              globalStyle.row,
              {
                paddingVertical: 8,
                paddingHorizontal,
              },
            ]}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={backIcon}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <ScreenTitle size={26} style={{paddingHorizontal}}>
          {title}
        </ScreenTitle>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SimpleLayout;

const styles = StyleSheet.create({
  backIcon: {
    width: 18,
    height: 18,
  },
  container: {
    flex: 1,
  },
});
