import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import commonImagePath from '../../constants/images';
import {Background} from '../../components/Background/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
const CustomDrawer = props => {
  const navigation = useNavigation();
  const cancelNav = () => {
    // props.navigation.closeDrawer();
    navigation.navigate('HomeTab');
  };
  return (
    <DrawerContentScrollView {...props}>
      <Background />
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
      <View style={{marginTop: 0}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
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
  },
});
