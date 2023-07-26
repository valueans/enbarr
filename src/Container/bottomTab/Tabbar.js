import {BlurView} from '@react-native-community/blur';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');
import COLORS from '../../utils/colors';
const TabBar = props => {
  const safeArea = useSafeAreaInsets();
  return (
    <View style={{}}>
      {Platform.OS == 'ios' ? (
        <BlurView
          style={styles.tabBarBlur}
          blurType="regular"
          blurAmount={2}
          blurRadius={2}
        />
      ) : (
        <View style={styles.tabBarBlurAndroid} />
      )}

      <View
        style={[
          Platform.OS == 'android' ? styles.tabBarAndroid : styles.tabBar,
        ]}
      />
      <BottomTabBar
        {...props}
        style={{elevation: 0}}
        tabBarStyle={{elevation: 0}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    right: 26,
    left: 26,
    bottom: 50,
    height: 56,
    backgroundColor: COLORS.color3,
    borderRadius: 15,
  },
  tabBarAndroid: {
    position: 'absolute',
    right: 26,
    left: 26,
    bottom: 20,
    height: 56,
    backgroundColor: COLORS.color3,
    borderRadius: 15,
  },
  tabBarBlur: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: 38,
    height: 80,
    // backgroundColor: COLORS.white,
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  tabBarBlurAndroid: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: 8,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,

    // elevation: 3,
  },
});

export default TabBar;
