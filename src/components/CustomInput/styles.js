import {StyleSheet} from 'react-native';
import theme from '../../constants/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.backgroundColor.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: '3%',
    backgroundColor: theme.backgroundColor.primary,
  },
  input: {
    flex: 1,
    height: hp('6%'),
    color: theme.fontColors.black,
  },
});
