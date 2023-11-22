import {StyleSheet} from 'react-native';
import theme from '../../../constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  foreignMatter: {
    flex: 1,
    marginTop: '3%',
  },
  addButton: {
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    color: theme.fontColors.inkBlack,
  },
  error: {
    fontSize: theme.fontSizes.smallFont,
    color: theme.fontColors.red,
  },

  //Modal
  modalContainer: {},
  modalView: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: theme.backgroundColor.grayShade,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  view: {borderWidth: 1, padding: 8},
});
