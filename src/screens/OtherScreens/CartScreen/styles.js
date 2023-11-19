import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '3%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
  },
  icons: {
    flexDirection: 'row',
  },
  screenShot: {
    paddingLeft: '15%',
  },

  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  totalPrice: {
    fontSize: theme.fontSizes.bigFont,
    color: theme.fontColors.secondaryBlack,
    fontWeight: 'bold',
  },

  columnOne: {
    alignSelf: 'flex-start',
  },
  columnTwo: {
    alignSelf: 'flex-end',
  },
  list: {
    flexDirection: 'row',
    marginBottom: '15%',
  },
});
