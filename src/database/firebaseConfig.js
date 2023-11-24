import {initializeApp, getApps, firebase} from '@react-native-firebase/app';
import {getAnalytics} from '@react-native-firebase/analytics';

import {getAuth} from '@react-native-firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDEBaCeSYdqZbDiSXW8DV3ygpzSk-_IRkQ',
  projectId: 'findost-8c57a',
  storageBucket: 'findost-8c57a.appspot.com',
  appId: '1:72124230268:android:5be524589ae45e7e8577f9',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const authFirebase = getAuth();
export const analytics = getAnalytics();
// const app = initializeApp(firebaseConfig);
// export {authFirebase, app};
firebase.crashlytics();
