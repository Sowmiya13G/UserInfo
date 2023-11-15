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
  title: {
    fontSize: theme.fontSizes.bigFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    marginBottom: '5%',
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
    height: hp('10%'),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wishListIcon: {
    marginRight: '3%',
  },
  productPrice: {
    fontSize: theme.fontSizes.mediumFontText,
    color: theme.fontColors.green,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
