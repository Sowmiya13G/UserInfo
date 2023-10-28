import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {Background} from '../../components/Background/Background';
import {findost} from '../../constants/images/images';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

  goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={findost} style={styles.logo} />
        <Text style={styles.title}>AP SignUp</Text>
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>Email</Text>
        <CustomInput
          placeholder={'Enter your email'}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>Password</Text>
        <CustomInput
          placeholder={'Enter your password'}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.feilds}>
        <CustomButton logInButton label="SIGNUP" handlePress={handleSignUp} />
      </View>
      <Text style={styles.authText}>Already an Authorized Person (AP)?</Text>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.register}>Login now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
