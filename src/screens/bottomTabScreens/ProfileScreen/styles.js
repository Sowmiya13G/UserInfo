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
  logOut: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingTop: '5%',
  },
  text: {
    fontSize: theme.fontSizes.smallFontText,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    paddingRight: '1%',
  },
  title: {
    fontSize: theme.fontSizes.bigFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    marginBottom: '4%',
    paddingHorizontal: '2%',
    alignItems: 'flex-end',
  },
  detailsText: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.black,
    paddingLeft: '6%',
  },
  profile: {
    alignSelf: 'center',
    paddingBottom: '5%',
  },
  profileImage: {
    width: wp('25%'),
    height: hp('10%'),
    borderRadius: wp('5%'),
  },
  profileIcon: {
    width: wp('25%'),
    height: hp('10%'),
    borderRadius: wp('5%'),
  },
  fileOption: {
    margin: '5%',
    alignSelf: 'flex-end',
  },
  editIcon: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    right: '5%',
    top: '80%',
    zIndex: 1,
  },
  downloadFile: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  uploadFile: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: '5%',
    paddingTop: '15%',
  },
  documentContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  documentText: {
    fontSize: 16,
    color: theme.fontColors.black,
  },
});
