import React, {useState, useEffect} from 'react';
import {Text, View, Button, Image} from 'react-native';
import {styles} from './styles';
import axios from 'axios';

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
        <Text>A</Text>
        <Text>A</Text>
      </View>
      {userData && (
        <View style={styles.details}>
          <Image source={{uri: userData.picture.large}} style={styles.image} />
          <Text style={styles.name}>
            {userData.name.first} {userData.name.last}
          </Text>
          <View style={styles.feilds}>
            <Text style={styles.title}>{userData.email}</Text>
          </View>
          <Text style={styles.title}>{userData.phone}</Text>
          <Text style={styles.title}>
            {' '}
            {userData.location.city}, {userData.location.country}
          </Text>
        </View>
      )}
      <Button title="Refresh" onPress={fetchUser} style={styles.button} />
    </View>
  );
}
