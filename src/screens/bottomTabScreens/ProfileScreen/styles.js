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
    justifyContent: 'space-between',
    padding: '5%',
  },
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.inkBlack,
    fontWeight: 'bold',
    paddingRight: '2%',
    paddingLeft: '2%',
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
    alignSelf: 'center',
    width: wp('30%'),
    height: hp('17%'),
    borderRadius: wp('15%'),
    marginBottom: '2%',
  },
  profileIcon: {
    alignSelf: 'center',
    width: wp('30%'),
    height: hp('17%'),
    borderRadius: wp('15%'),
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
