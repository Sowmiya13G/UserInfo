import {StyleSheet} from 'react-native';
import theme from '../../constants/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSizes.mediumFont,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: theme.fontColors.secondaryBlack,
  },
  feilds: {
    width: '90%',
  },
});
