import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const fontSizes = {
  bigFont: hp('3%'),
  mediumFont: hp('2%'),
  smallFont: hp('1%'),
};

const fontFamily = {
  fontRobotoBlack: 'Roboto-Black',
  fontRobotoBold: 'Roboto-Black',
  fontRobotoLight: 'Roboto-Light',
  fontRobotoRegular: 'Roboto-Regular',
};

const fontColors = {
  secondaryBlack: '#292929',
  inkBlack: '#252A31',
  inkLight: '#697D95',
  inkDark: '#252A31',
  orange: '#E47718',
};

export default {
  fontSizes,
  fontFamily,
  fontColors,
};
