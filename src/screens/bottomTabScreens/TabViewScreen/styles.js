import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    height: theme.screenHeight,
    width: theme.screenWidth,
    backgroundColor: 'transparent',
  },
  cardView: {
    backgroundColor: theme.backgroundColor.grayShade,
    padding: '4%',
  },
  tabBar: {
    backgroundColor: theme.backgroundColor.lightGray,
    borderBottomEndRadius: wp('5%'),
    borderBottomStartRadius: wp('5%'),
    width: '100%',
    alignSelf: 'center',
  },
  tabContent: {
    borderRadius: wp('5%'),
    marginTop: '5%',
    padding: '4%',
  },
  logo: {
    height: hp('8%'),
    width: wp('8%'),
    resizeMode: 'contain',
    marginLeft: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.mediumFontText,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  animatedView: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    zIndex: -1,
    padding: '30%',
  },
  option: {flexDirection: 'row', alignItems: 'center'},
  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
