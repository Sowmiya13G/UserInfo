import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {Background} from '../../../components/Background/Background';
import commonImagePath from '../../../constants/images';
import {CustomInput} from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import strings from '../../../constants/strings';
import {useDispatch} from 'react-redux';
import {signInWithGoogle} from '../../../database/googleServices';
import {setUserAction} from '../../../redux/actions/authAction';
import {loginUser} from '../../../apiServices';
import crashlytics from '@react-native-firebase/crashlytics';

export default LoginScreen = () => {
  const [authorizedPerson, setAuthorizedPerson] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleLogin = async () => {
    if (!authorizedPerson || !password) {
      Alert.alert(
        'Validation Error',
        'Please enter both AP Login ID and password.',
      );
      return;
    }

    try {
      const user = await loginUser(authorizedPerson, password);

      if (user.userData) {
        dispatch(setUserAction(user.userData));
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid AP Login ID or password. Please try again.',
        );
      }
    } catch (error) {
      console.error('Login Error:', error);
      crashlytics.logException(error.message || 'Unknown error');
      crashlytics().recordError(error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  goToAuthLogin = () => {
    navigation.navigate('FirebaseLoginScreen');
  };
  goToRegister = () => {
    navigation.navigate('SignUpScreen');
  };
  const continueWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Google Sign-In success:', user);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('Error', error.message);
      crashlytics.logException(error.message || 'Unknown error');
    }
  };
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={commonImagePath.findost} style={styles.logo} />
        <Text style={styles.title}>{strings.loginTitle}</Text>
      </View>
      <View style={styles.feilds}>
        <Text style={styles.text}>{strings.login}</Text>
        <CustomInput
          placeholder={'Enter your AP Login ID'}
          value={authorizedPerson}
          onChangeText={text => setAuthorizedPerson(text)}
        />

        <Text style={styles.option}>{strings.loginOption}</Text>
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
      <Image source={commonImagePath.faceID} style={styles.logo} />
      <View style={styles.feilds}>
        <CustomButton logInButton label="LOGIN" handlePress={handleLogin} />
        <CustomButton
          optionButton
          label="LOGIN VIA OTP"
          handlePress={goToAuthLogin}
        />
      </View>
      <Text style={styles.authText}>{strings.authPerson}</Text>
      <TouchableOpacity onPress={goToRegister}>
        <Text style={styles.register}>{strings.register}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={continueWithGoogle}>
        <Text style={styles.google}>{strings.googleLogin}</Text>
      </TouchableOpacity>
    </View>
  );
};
