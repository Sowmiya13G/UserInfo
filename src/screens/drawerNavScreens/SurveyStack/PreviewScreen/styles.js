import {StyleSheet} from 'react-native';
import theme from '../../../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  text: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  view: {},
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    paddingLeft: '23%',
    width: wp('100%'),
    right: '100%',
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
    color: theme.fontColors.secondaryBlack,
    paddingLeft: '5%',
  },

  header: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'flex-start',
  },
  button: {
    padding: '5%',
  },
});
