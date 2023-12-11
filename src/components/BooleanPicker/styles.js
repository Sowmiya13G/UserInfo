import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: '5%',
    flexDirection: 'row',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    paddingRight: '2%',
    paddingLeft: '2%',
  },
});
