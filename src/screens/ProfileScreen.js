import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {
  const URL = 'https://randomuser.me/api/';
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get(URL)
      .then(response => {
        setUserData(response.data.results[0]);
      })
      .catch(error => {
        console.error('Error fetching user', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon name="tasks" size={13} color="#000" />
        </View>
        <View style={styles.headerIcon}>
          <Icon name="tasks" size={13} color="#000" />
        </View>
      </View>
      {userData && (
        <View style={styles.container}>
          <Image source={{uri: userData.picture.large}} style={styles.image} />
          <Text style={styles.name}>
            {userData.name.first} {userData.name.last}
          </Text>
          <View style={styles.view}>
            <Text style={styles.mobileNumberText}>{userData.name.first}</Text>
            <Icon name="tasks" size={15} color="#000" style={styles.icon} />
          </View>
          <View style={styles.view}>
            <Text style={styles.mobileNumberText}>User Profile</Text>
            <Icon
              name="tencent-weibo"
              size={15}
              color="#000"
              style={styles.icon}
            />
          </View>
          <View style={styles.mobileNumber}>
            <Text style={styles.mobileNumberText}>{userData.name.first}</Text>
            <Text style={styles.mobileNumberText}>{userData.phone}</Text>
            <Icon name="user-o" size={30} color="#000" style={styles.icon} />
          </View>
        </View>
      )}
      <TouchableOpacity onPress={fetchUser} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
