import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import {background} from '../../constants/images/images';
export const Background = () => {
  return (
    <View style={styles.container}>
      <Image
        source={background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </View>
  );
};
