import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    height: hp('23%'),
    width: wp('92%'),
    padding: '5%',
    backgroundColor: theme.backgroundColor.ghostWhite,
    borderRadius: wp('5%'),
    borderWidth: 1,
    marginBottom: '5%',
    borderColor: theme.backgroundColor.gray,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5%',
  },
  one: {
    flexDirection: 'row',
    alignItem: 'center',
    paddingBottom: '5%',
  },
  two: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
    paddingBottom: '5%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  others: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.mediumFont,
    fontWeight: 'bold',
    marginLeft: '5%',
  },

  text: {
    fontSize: theme.fontSizes.smallFontText,
    color: theme.fontColors.inkBlack,
    marginLeft: '5%',
  },
  address: {
    flex: 2,
    fontSize: theme.fontSizes.smallFontText,
    color: theme.fontColors.inkBlack,
    marginLeft: '5%',
  },
  map: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  three: {
    flexDirection: 'row',
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cid: {
    alignItems: 'center',
    fontSize: theme.fontSizes.smallFontText,
    padding: '2%',
    backgroundColor: theme.backgroundColor.lightCyne,
    color: theme.fontColors.systemBlue,
    marginRight: '5%',
  },
  active: {
    alignItems: 'center',
    fontSize: theme.fontSizes.smallFontText,
    padding: '2%',
    backgroundColor: theme.backgroundColor.lightGreen,
    color: theme.fontColors.systemGreen,
    marginRight: '3%',
  },
});
