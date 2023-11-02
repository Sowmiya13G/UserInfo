import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: '3%',
    borderWidth: 1,
    borderColor: theme.borderColor.white,
    backgroundColor: theme.backgroundColor.white,
    padding: '5%',
    // borderRadius: 8,
  },
  productImage: {
    width: wp('30%'),
    height: hp('15%'),
    resizeMode: 'cover',
    borderRadius: wp('1%'),
  },
  details: {
    display: 'flex',
    margin: 3,
    padding: '3%',
    width: '60%',
  },
  productTitle: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.black,
    marginBottom: '2%',
  },
  productPrice: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.green,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    padding: '2%',
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
  clearCartButton: {
    display: 'flex',
    alignSelf: 'flex-end',
    padding: 3,
  },
  clearCartButtonText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginRight: 10,
    opacity: 0.8,
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
});
