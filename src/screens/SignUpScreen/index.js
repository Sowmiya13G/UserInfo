import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {Background} from '../../components/Background/Background';
import commonImagePath from '../../constants/images';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import strings from '../../constants/strings';

import {useDispatch} from 'react-redux';
import {signupUserAction} from '../../redux/actions/authAction';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
const SignUpScreen = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  goToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  // const handleSignup = () => {
  //   dispatch(signupUserAction(authorizedPerson, password));
  // };
  const handleSignUp = () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log('Firebase Error Code:', error.code);
        console.log('Firebase Error Message:', error.message);

        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Signup Error', 'Email already in use.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Signup Error', 'Invalid email address.');
            break;
          case 'auth/weak-password':
            Alert.alert(
              'Signup Error',
              'Weak password. Password should be at least 6 characters.',
            );
            break;
          default:
            Alert.alert('Signup Error', 'An internal error has occurred.');
        }
        console.log('Signup Error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={commonImagePath.findost} style={styles.logo} />
        <Text style={styles.title}>{strings.signupTitle}</Text>
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>{strings.signup}</Text>
        <CustomInput
          placeholder={'Enter your AP ID'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>{strings.password}</Text>
        <CustomInput
          placeholder={'Enter your password'}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.feilds}>
        <CustomButton logInButton label="SIGNUP" handlePress={handleSignUp} />
      </View>
      <Text style={styles.authText}>{strings.authPerson}</Text>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.register}>{strings.loginNow}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
