import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  view: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.secondaryBlack,
    paddingRight: '2%',
    paddingLeft: '2%',
    marginBottom: '5%',
  },
  title: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
    fontWeight: 'bold',
    paddingLeft: '23%',
  },
  scroll: {
    flex: 1,
    width: wp('97%'),
    padding: '2%',
    margin: '2%',
  },
  input: {
    borderWidth: wp('0.5%'),
    borderRadius: 5,
    width: wp('90%'),
    marginBottom: '5%',
    paddingLeft: wp('28%'),
    fontSize: theme.fontSizes.mediumFont,
  },
  dropdownWrapper: {
    position: 'absolute',
    zIndex: 1,
    left: '-1%',
  },
  viewOptions: {
    marginTop: '25%',
  },

  header: {
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'flex-start',
  },
  button: {
    padding: '5%',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
});
