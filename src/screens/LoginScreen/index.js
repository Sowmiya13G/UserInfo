import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {Background} from '../../components/Background/Background';
import {faceID, findost} from '../../constants/images';
import {CustomInput} from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import strings from '../../constants/strings';
import {useDispatch} from 'react-redux';
import {loginUserAction} from '../../redux/actions/authAction';

export default LoginScreen = () => {
  const [authorizedPerson, setAuthorizedPerson] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleLogin = () => {
    dispatch(loginUserAction(authorizedPerson, password));
  };
  goToRegister = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <Image source={findost} style={styles.logo} />
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
      <Image source={faceID} style={styles.logo} />
      <View style={styles.feilds}>
        <CustomButton logInButton label="LOGIN" handlePress={handleLogin} />
        <CustomButton
          optionButton
          label="LOGIN VIA OTP"
          handlePress={handlePasswordVisibility}
        />
      </View>
      <Text style={styles.authText}>{strings.authPerson}</Text>
      <TouchableOpacity onPress={goToRegister}>
        <Text style={styles.register}>{strings.register}</Text>
      </TouchableOpacity>
    </View>
  );
};

// import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
// import {connect} from 'react-redux';
// import {login} from '../../redux/actions/authAction';

// const handleLogin = () => {
//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//       const user = userCredential.user;
//       login(user);
//       navigation.navigate('HomeScreen');
//     })
//     .catch(error => {
//       console.log('Firebase Error Code:', error.code);
//       console.log('Firebase Error Message:', error.message);
//       switch (error.code) {
//         case 'auth/invalid-email':
//           Alert.alert('Login Error', 'Invalid email address.');
//           break;
//         case 'auth/user-not-found':
//           Alert.alert('Login Error', 'User not found.');
//           break;
//         case 'auth/wrong-password':
//           Alert.alert('Login Error', 'Incorrect password.');
//           break;
//         default:
//           Alert.alert('Login Error', 'An internal error has occurred.');
//       }
//       console.log('Login Error', error);
//     });
// };
