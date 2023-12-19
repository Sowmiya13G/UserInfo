import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';

// Packages
import {useNavigation} from '@react-navigation/native';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';

// Styles
import {styles} from './styles';

// Constants
import commonImagePath from '../../../constants/images';
import strings from '../../../constants/strings';

// Components
import {Background} from '../../../components/Background/Background';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

const SignUpScreen = () => {
  // Use State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Variables
  const navigation = useNavigation();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Navigation
  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  // Functions
  const handleSignup = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Signup Error', 'Please enter both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Signup Error', 'Invalid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Signup Error',
        'Weak password. Password should be at least 6 characters.',
      );
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log('Firebase Error Code:', error.code);
        console.log('Firebase Error Message:', error.message);
        crashlytics.logException(error.message || 'Unknown error');
        crashlytics().recordError(error);
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

  // Render UI.........
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={commonImagePath.findost} style={styles.logo} />
        <Text style={styles.title}>{strings.signupTitle}</Text>
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>{strings.enterEmail}</Text>
        <CustomInput
          placeholder={'Enter your email'}
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
        <CustomButton logInButton label="SIGNUP" handlePress={handleSignup} />
      </View>
      <Text style={styles.authText}>{strings.authPerson}</Text>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.register}>{strings.loginNow}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
