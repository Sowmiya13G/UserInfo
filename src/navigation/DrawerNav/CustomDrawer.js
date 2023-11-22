import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import commonImagePath from '../../constants/images';
import {Background} from '../../components/Background/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {clearUserDataAction} from '../../redux/actions/authAction';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
const CustomDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cancelNav = () => {
    // props.navigation.closeDrawer();
    navigation.navigate('HomeTab');
  };
  const handleLogout = async () => {
    console.log('logged out successfully');
    try {
      await auth().signOut();
      dispatch(clearUserDataAction());
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <Background />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.details}>
            <Image source={commonImagePath.profile}></Image>
            <Text style={styles.userName}>Rosy Merlin</Text>
            <Text style={styles.text}>View Profile</Text>
          </View>
          <TouchableOpacity onPress={cancelNav} style={styles.cancel}>
            <Icon name={'close'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <DrawerItemList {...props} />
        </View>
        <TouchableOpacity style={styles.logOut} onPress={handleLogout}>
          <Icon name={'sign-out'} size={25} color={theme.fontColors.black} />
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: hp('90%'),
  },
  cancel: {
    right: '5%',
    top: '5%',
    position: 'absolute',
  },
  userName: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.bigFont,
  },
  text: {
    color: theme.fontColors.secondaryBlack,
    opacity: 0.5,
    fontSize: theme.fontSizes.mediumFontText,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: theme.screenWidth,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    bottom: 0,
  },
  logOut: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '0%',
    left: '6%',
  },
  logOutText: {
    color: theme.fontColors.secondaryBlack,
    fontSize: theme.fontSizes.mediumFontText,
    fontWeight: 'bold',
    paddingLeft: '3%',
  },
});
