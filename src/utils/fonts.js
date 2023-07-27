import {Platform} from 'react-native';

const fonts = {
  regular: Platform.OS == 'ios' ? 'Poppins-Regular' : 'PoppinsRegular',
  light: Platform.OS == 'ios' ? 'Poppins-Light' : 'PoppinsLight',
  medium: Platform.OS == 'ios' ? 'Poppins-Medium' : 'PoppinsMedium',
  semiBold: Platform.OS == 'ios' ? 'Poppins-SemiBold' : 'PoppinsSemiBold',
  bold: Platform.OS == 'ios' ? 'Poppins-Bold' : 'PoppinsBold',
  sp: Platform.OS == 'ios' ? 'BookmanOldStyle' : 'Bookman Old Style',
};
export default fonts;
