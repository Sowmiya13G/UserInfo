import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  scopes: ['email'],
  webClientId:
    '72124230268-hclhn4vd4rtne318do8l4vmj4hmrmr8j.apps.googleusercontent.com',
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  const {idToken, user} = await GoogleSignin.signIn();
  const googelCredential = auth.GoogleAuthProvider.credential(idToken);
  return user, auth().signInWithCredential(googelCredential);
};
