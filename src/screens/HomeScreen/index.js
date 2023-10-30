import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomButton from '../../components/CustomButton/CustomButton';
import {Background} from '../../components/Background/Background';
import strings from '../../constants/strings';
import commonImagePath from '../../constants/images';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUserAction} from '../../redux/actions/authAction';
import {connect} from 'react-redux';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authorizedPerson = useSelector(state => state.auth.authorizedPerson);
  console.log('Authorized Person:', authorizedPerson);
  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Background />
      <Image source={commonImagePath.findost} />
      <Text style={styles.text}>{strings.welcome}</Text>
      <Text style={styles.text}>{authorizedPerson}</Text>
      <View style={styles.feilds}>
        <CustomButton optionButton label="LOGOUT" handlePress={handleLogout} />
      </View>
    </View>
  );
};
export default HomeScreen;
