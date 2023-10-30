import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import commonImagePath from '../../constants/images';
export const Background = () => {
  return (
    <View style={styles.container}>
      <Image
        source={commonImagePath.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </View>
  );
};
