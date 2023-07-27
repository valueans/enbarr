import {StyleSheet} from 'react-native';
import COLORS from './colors';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  innerContainer: {
    paddingHorizontal: 16,
    flex: 1,
    position: 'relative',
  },
  shadowBtn: {
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 4,
  },
  shadowLg: {
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnType2: {
    backgroundColor: COLORS.color15,
    borderWidth: 1,
    borderColor: COLORS.color16,
  },
});
