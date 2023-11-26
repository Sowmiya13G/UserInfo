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
import {loginRequest} from '../../../redux/actions/authAction';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';

export default FirebaseLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  goToAPLogin = () => {
    navigation.navigate('SignUpScreen');
  };

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
      </View>
      <TouchableOpacity onPress={goToAPLogin}>
        <Text style={styles.register}>{strings.loginWithAPID}</Text>
      </TouchableOpacity>
    </View>
  );
};
