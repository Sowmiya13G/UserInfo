import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: theme.screenHeight,
    width: theme.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    marginBottom: '3%',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
  },
  feilds: {
    width: wp('90%'),
    paddingBottom: '2%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    marginBottom: '3%',
    color: theme.fontColors.inkBlack,
  },
  option: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.smallFont,
  },
  icon: {
    position: 'absolute',
    right: '8%',
    top: '40%',
  },
  register: {
    color: theme.fontColors.orange,
    fontWeight: 'bold',
  },
  authText: {
    fontWeight: 'bold',
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.smallFontText,
  },
  google: {
    color: theme.fontColors.secondaryBlack,
    paddingTop: '3%',
    fontSize: theme.fontSizes.mediumFont,
  },
});
