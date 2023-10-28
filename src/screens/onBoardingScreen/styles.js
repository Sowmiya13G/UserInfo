import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: '100%',
    height: '60%',
    padding: '5%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#292929',
  },
  data: {
    marginTop: '5%',
    marginBottom: '3%',
    width: '100%',
    height: '90%',
    marginBottom: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#292929',
    paddingBottom: '10%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    marginBottom: '10%',
  },
  paginationDotActive: {
    backgroundColor: '#E47718',
    width: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  skipView: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: '15%',
  },
  skipButton: {
    alignSelf: 'flex-end',
    color: '#000',
    fontWeight: 'bold',
  },
});
