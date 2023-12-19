import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: theme.screenHeight,
    width: theme.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    marginBottom: '3%',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
  },
  feilds: {
    width: wp('90%'),
    paddingBottom: '2%',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    marginBottom: '3%',
    color: theme.fontColors.inkBlack,
  },
  option: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.smallFont,
  },
  icon: {
    position: 'absolute',
    right: '8%',
    top: '40%',
  },
  register: {
    color: theme.fontColors.orange,
    fontWeight: 'bold',
  },
  authText: {
    fontWeight: 'bold',
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.smallFontText,
  },
  google: {
    color: theme.fontColors.secondaryBlack,
    paddingTop: '3%',
    fontSize: theme.fontSizes.mediumFont,
    paddingBottom: '3%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // opacity: 0.5,
  },

  fingerprintModalContainer: {
    flex: 1,
    backgroundColor: theme.backgroundColor.white,
    padding: '5%',
    borderRadius: wp('5%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('70%'),
    height: hp('20%'),
    margin: '90%',
  },

  fingerprintIcon: {
    width: wp('50%'),
    height: hp('20%'),
    marginBottom: '5%',
    resizeMode: 'contain',
  },

  modalText: {
    marginBottom: '5%',
    textAlign: 'center',
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.orangeCoral,
  },

  cancelButton: {
    color: theme.fontColors.black,
    fontSize: theme.fontSizes.smallFontText,
    fontWeight: 'bold',
  },
});
