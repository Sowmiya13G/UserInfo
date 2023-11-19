import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.fontColors.white,
    backgroundColor: theme.backgroundColor.white,
    padding: '5%',
    borderRadius: wp('8%'),
    margin: '3%',
    elevation: 5,
  },
  productPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.green,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '5%',
  },
  options: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('28%'),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('15%'),
  },
  quantityText: {
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    color: theme.fontColors.black,
  },
  productTitle: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.black,
    marginBottom: '2%',
  },
});
