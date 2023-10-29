import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    height: theme.screenHeight,
    width: theme.screenWidth,
    zIndex: -1,
    backgroundColor: theme.backgroundColor,
  },
  backgroundImage: {
    width: wp('100%'),
    height: hp('60%'),
  },
});
