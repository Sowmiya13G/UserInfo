import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    paddingHorizontal: 16,
    height: theme.screenHeight,
    width: theme.screenWidth,
  },
  view: {
    position: 'absolute',
    top: '20%',
    margin: '5%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.secondaryBlack,
    paddingRight: '2%',
    paddingLeft: '2%',
  },
  input: {
    borderWidth: wp('0.5%'),
    borderRadius: 5,
    width: wp('90%'),
    marginBottom: '5%',
  },
  dropdownWrapper: {
    position: 'absolute',
    zIndex: 1,
  },
  viewOptions: {
    marginTop: '25%',
  },
});
