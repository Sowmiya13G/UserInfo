import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomButton from '../../components/CustomButton/CustomButton';
import {Background} from '../../components/Background/Background';
import strings from '../../constants/strings';
import {findost} from '../../constants/images';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUserAction} from '../../redux/actions/authAction';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigation.navigate('OnboardingScreen');
  };

  return (
    <View style={styles.container}>
      <Background />
      <Image source={findost} />
      <Text style={styles.text}>{strings.welcome}</Text>
      <Text style={styles.text}>{user ? user.email : 'Guest'}</Text>
      <View style={styles.feilds}>
        <CustomButton optionButton label="LOGOUT" handlePress={handleLogout} />
      </View>
    </View>
  );
};
export default HomeScreen;
// import {logout} from '../../redux/actions/authAction';
// dispatchLogout();
