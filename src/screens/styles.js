import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    marginTop: '3%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
    width: '90%',
  },
  name: {
    marginTop: 10,
    fontSize: 35,
    color: '#000',
    fontWeight: 'bold',
  },
  feilds: {
    width: '95%',
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    color: '#000',
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    borderRadius: 25,
    width: '90%',
  },
});
