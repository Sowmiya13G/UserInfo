import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';

// Packages
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Biometrics from 'react-native-biometrics';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';

// Styles
import {styles} from './styles';

// Constants
import strings from '../../../constants/strings';
import commonImagePath from '../../../constants/images';

// Components
import {Background} from '../../../components/Background/Background';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

// Redux
import {useDispatch} from 'react-redux';
import {loginRequest} from '../../../redux/actions/authAction';

export default FirebaseLoginScreen = () => {
  // Use state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // variables
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Functions
  const handlePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Login Error', 'Invalid email address.');
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginRequest(email, password));

      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Firebase Error:', error);
      Alert.alert('Login Error', `Firebase Error: ${error.message || error}`);
      crashlytics.logException(error.message || 'Unknown error');
      crashlytics().recordError(error);
    }
  };

  const handleFaceIDLogin = async () => {
    try {
      const {success} = await Biometrics.simplePrompt({
        promptMessage: 'Authenticate with Face ID',
      });

      if (success) {
        handleLogin();
      } else {
        Alert.alert(
          'Face ID Authentication Failed',
          'Please try again or use another authentication method.',
        );
      }
    } catch (error) {
      console.error('Biometrics Error:', error);
      Alert.alert(
        'Biometrics Error',
        `An error occurred during biometric authentication: ${
          error.message || error
        }`,
      );
    }
  };

  // Navigations
  const goToAPLogin = () => {
    navigation.navigate('SignUpScreen');
  };

  // Render UI .........................

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={commonImagePath.findost} style={styles.logo} />
        <Text style={styles.title}>{strings.firebaseLogin}</Text>
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={handlePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="grey"
          />
        </TouchableOpacity>
        <Text style={styles.option}>{strings.passwordOption}</Text>
      </View>
      <View style={styles.feilds}>
        <CustomButton logInButton label="LOGIN" handlePress={handleLogin} />
        <CustomButton
          optionButton
          label="FACE ID"
          handlePress={handleFaceIDLogin}
        />
      </View>
      <TouchableOpacity onPress={goToAPLogin}>
        <Text style={styles.register}>{strings.loginWithAPID}</Text>
      </TouchableOpacity>
    </View>
  );
};
