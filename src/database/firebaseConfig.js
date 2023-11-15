import {initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDEBaCeSYdqZbDiSXW8DV3ygpzSk-_IRkQ',
  projectId: 'findost-8c57a',
  storageBucket: 'findost-8c57a.appspot.com',
  appId: '1:72124230268:android:5be524589ae45e7e8577f9',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {auth, app};
