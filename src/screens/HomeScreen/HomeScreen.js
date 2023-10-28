import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {findost} from '../../constants/images/images';
import {connect} from 'react-redux';
import {styles} from './styles';
import {logout} from '../../redux/actions/authAction';
import CustomButton from '../../components/CustomButton/CustomButton';
import {Background} from '../../components/Background/Background';

const HomeScreen = ({userEmail, dispatchLogout}) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatchLogout();
    navigation.navigate('OnboardingScreen');
  };

  return (
    <View style={styles.container}>
      <Background />
      <Image source={findost} />
      <Text style={styles.text}>Welcome User!</Text>
      <Text style={styles.text}>{userEmail}</Text>
      <View style={styles.feilds}>
        <CustomButton optionButton label="LOGOUT" handlePress={handleLogout} />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userEmail: state.auth.user ? state.auth.user.email : null,
  };
};

const mapDispatchToProps = {
  dispatchLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
