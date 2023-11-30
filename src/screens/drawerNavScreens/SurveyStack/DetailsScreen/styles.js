import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  scroll: {
    flex: 1,
    width: wp('97%'),
    padding: '2%',
    margin: '2%',
  },
  view: {
    position: 'absolute',
    top: '20%',
    margin: '5%',
  },
  // text: {
  //   fontSize: theme.fontSizes.mediumFont,
  //   color: theme.fontColors.secondaryBlack,
  //   paddingRight: '2%',
  //   paddingLeft: '2%',
  // },
  text: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  view: {
    height: hp('35%'),
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    paddingLeft: '23%',
  },
  subContainer: {
    padding: '2%',
    width: wp('99%'),
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
