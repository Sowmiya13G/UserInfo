import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {tabBar} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../constants/theme';
import {styles} from './styles';

export default function UserCard() {
  const navigation = useNavigation();

  const handleView = index => {
    // navigation.navigate('ProfileTab');
    navigation.jumpTo('ProfileTab', {index});
  };
  return (
    <View style={styles.container}>
      <View style={styles.one}>
        <View style={styles.user}>
          <Icon name="user-circle" size={21} color={theme.fontColors.blue} />
          <Text style={styles.title}>Client Name here</Text>
        </View>
        <View style={styles.user}>
          <Text style={styles.cid}>CID23198</Text>
          <Text style={styles.active}>Active</Text>
        </View>
        <TouchableOpacity onPress={() => handleView(3)} style={styles.user}>
          <Icon
            name="chevron-right"
            size={15}
            color={theme.fontColors.secondaryBlack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.two}>
        <View style={styles.option}>
          <Icon name="phone" size={13} color={theme.fontColors.black} />
          <Text style={styles.text}>+91 98767 76767</Text>
        </View>
        <View style={styles.option}>
          <Icon
            name="envelope-o"
            size={15}
            color={theme.fontColors.secondaryBlack}
          />
          <Text style={styles.text}>sampleemail@gmail.com</Text>
        </View>
      </View>
      <View style={styles.three}>
        <View style={styles.map}>
          <Icon name="map-o" size={13} color={theme.fontColors.black} />
          <Text style={styles.address}>
            A7 Block, 8B, Hidden leaf Apartment, Chennai, 600043
          </Text>
        </View>
        <View style={styles.others}>
          <Icon name="phone" size={14} color={theme.fontColors.orange} />
          <Icon name="envelope-o" size={14} color={theme.fontColors.orange} />
        </View>
      </View>
    </View>
  );
}
