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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  title: {
    fontSize: theme.fontSizes.bigFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.inkLight,
    fontWeight: 'bold',
    // marginRight: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: wp('10%'),
    marginBottom: '3%',
    borderColor: theme.borderColor.white,
    backgroundColor: theme.backgroundColor.white,
    borderRadius: wp('30%'),
    elevation: 5,
  },
  productImage: {
    width: wp('15%'),
    height: hp('8%'),
    resizeMode: 'cover',
    borderRadius: wp('5%'),
  },
  details: {
    display: 'flex',
    width: '60%',
  },

  productPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.green,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2%',
  },

  quantityButtonText: {
    color: theme.fontColors.candyBlue,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: theme.fontSizes.mediumFontText,
    fontWeight: 'bold',
    color: theme.fontColors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: wp('10%'),
  },
  clearCartButton: {
    alignSelf: 'flex-end',
    padding: wp('3%'),
    marginTop: hp('2%'),
    backgroundColor: 'red',
    borderRadius: wp('2%'),
  },
  clearCartButtonText: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0.8,
  },

  takeScreenshotButton: {
    alignSelf: 'center',
    padding: wp('3%'),
    marginTop: hp('2%'),
    backgroundColor: 'green',
    borderRadius: wp('2%'),
  },
  takeScreenshotButtonText: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  removeButton: {
    backgroundColor: theme.backgroundColor.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: theme.fontColors.white,
  },
  productTitle: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.black,
    marginBottom: '2%',
  },
});
