import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  feilds: {
    width: '90%',
    paddingBottom: '2%',
  },
  text: {
    fontSize: 16,
    marginBottom: '3%',
    color: '#252A31',
  },
  option: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 13,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
  register: {
    color: '#E47718',
    fontWeight: 'bold',
  },
  authText: {
    fontWeight: 'bold',
    color: '#292929',
    fontSize: 13,
  },
});
