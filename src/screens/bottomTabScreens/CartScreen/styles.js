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
    paddingBottom: '5%',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
  },
  clearCart: {
    paddingRight: '5%',
  },
  title: {
    fontSize: theme.fontSizes.bigFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: wp('10%'),
  },
  totalPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.inkLight,
    fontWeight: 'bold',
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.fontColors.white,
    backgroundColor: theme.backgroundColor.white,
    padding: '3%',
    borderRadius: wp('8%'),
    margin: '3%',
    elevation: 5,
    marginBottom: 0,
  },
  productImage: {
    width: wp('15%'),
    height: hp('8%'),
    resizeMode: 'cover',
    // borderRadius: wp('5%'),
  },
  details: {
    display: 'flex',
    width: '60%',
  },
  extraHeight: {
    height: 150,
  },
  productPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.green,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    alignSelf: 'flex-end',
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
