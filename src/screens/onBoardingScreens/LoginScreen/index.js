import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';

// Packages
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import TouchID from 'react-native-touch-id';

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
import {setUserAction} from '../../../redux/actions/authAction';

// Services
import {loginUser} from '../../../apiServices';
import {signInWithGoogle} from '../../../database/googleServices';
import {checkFingerprintPermission} from '../../../utils/androidPermissions';

export default LoginScreen = () => {
  // Use state
  const [authorizedPerson, setAuthorizedPerson] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // variables
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Functions
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

  const authenticateWithFingerprint = () => {
    TouchID.authenticate('Authenticate with your fingerprint')
      .then(success => {
        console.log('Fingerprint Authentication Successful');
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        console.log('Fingerprint Authentication Failed', error);
        Alert.alert('Authentication Failed', 'Please try again.');
      });
  };
  // Navigations
  const goToAuthLogin = () => {
    navigation.navigate('FirebaseLoginScreen');
  };
  const goToRegister = () => {
    navigation.navigate('SignUpScreen');
  };

  // Use Effect
  useEffect(() => {
    checkFingerprintPermission();
  }, []);

  // Render UI .........................

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
      <TouchableOpacity onPress={authenticateWithFingerprint}>
        <Image source={commonImagePath.faceID} style={styles.logo} />
      </TouchableOpacity>
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

{
  /* <Image
                source={commonImagePath.fingerprintIcon}
                style={styles.fingerprintIcon}
              /> 
         // const authenticateWithFingerprint = () => {
  //   TouchID.authenticate('Authenticate with your fingerprint')
  //     .then(success => {
  //       console.log('Fingerprint Authentication Successful');
  //     })
  //     .catch(error => {
  //       console.log('Fingerprint Authentication Failed', error);
  //       Alert.alert('Authentication Failed', 'Please try again.');
  //     });
  // // };
  // const showFingerprintModal = () => {
  //   setFingerprintModalVisible(true);
  // };

  // const hideFingerprintModal = () => {
  //   setFingerprintModalVisible(false);
  // };   
    const [isFingerprintModalVisible, setFingerprintModalVisible] =
    useState(false);
  
            
       {isFingerprintModalVisible && (
        <Modal
          transparent={true}
          isVisible={isFingerprintModalVisible}
          onBackdropPress={hideFingerprintModal}
          onBackButtonPress={hideFingerprintModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.fingerprintModalContainer}>
              <Text style={styles.modalText}>
                Place your fingerprint on the sensor to authenticate
              </Text>
              <TouchableOpacity onPress={hideFingerprintModal}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}     
            
            */
}

// const checkFingerprintPermission = async () => {
//   const result = await check(PERMISSIONS.ANDROID.USE_FINGERPRINT);

//   if (result === RESULTS.DENIED) {
//     requestFingerprintPermission();
//   }
// };

// const requestFingerprintPermission = async () => {
//   const result = await request(PERMISSIONS.ANDROID.USE_FINGERPRINT);

//   if (result === RESULTS.GRANTED) {
//     console.log('Fingerprint permission granted');
//   } else {
//     console.log('Fingerprint permission denied');
//   }
// };
