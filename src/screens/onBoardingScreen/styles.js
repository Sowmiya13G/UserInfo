import {StyleSheet} from 'react-native';
import theme from '../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: theme.screenHeight,
    width: theme.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: wp('100%'),
    height: hp('44%'),
    padding: '5%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.fontColors.secondaryBlack,
  },
  data: {
    marginTop: '5%',
    marginBottom: '3%',
    width: '100%',
    height: '90%',
    marginBottom: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  description: {
    fontSize: theme.fontSizes.mediumFont,
    textAlign: 'center',
    color: theme.fontColors.secondaryBlack,
    paddingBottom: '10%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.backgroundColor.black,
  },
  paginationDot: {
    width: wp('3%'),
    height: hp('1.3%'),
    borderRadius: 5,
    backgroundColor: theme.backgroundColor.gray,
    marginHorizontal: 5,
    marginBottom: '10%',
  },
  paginationDotActive: {
    backgroundColor: theme.backgroundColor.orange,
    width: wp('8%'),
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonContainer: {
    width: wp('90%'),
    alignSelf: 'center',
  },

  buttonText: {
    color: theme.fontColors.white,
    fontSize: theme.fontSizes.mediumFont,
  },
  skipView: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: '15%',
  },
  skipButton: {
    alignSelf: 'flex-end',
    color: theme.fontColors.black,
    fontWeight: 'bold',
  },
});
