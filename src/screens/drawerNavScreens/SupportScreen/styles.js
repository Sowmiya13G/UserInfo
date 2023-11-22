import {StyleSheet} from 'react-native';
import theme from '../../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  feilds: {
    marginTop: '10%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  error: {
    fontSize: theme.fontSizes.smallFont,
    color: theme.fontColors.red,
  },

  chart: {
    margin: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.backgroundColor.grayShade,
    height: hp('5%'),
    width: wp('90%'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.backgroundColor.gray,
    marginBottom: '5%',
  },
  buttonText: {
    fontSize: theme.fontSizes.smallFontText,
    color: theme.fontColors.black,
    alignSelf: 'center',
  },
});
