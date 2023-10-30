import axios from 'axios';
import {AppConfig} from '../config/AppConfig';
import {apiEndPoints} from './apiEndPoints';

export const loginUser = async (authorizedPerson, password) => {
  try {
    const response = await axios.post(
      `${AppConfig.BaseURL}${apiEndPoints.login}`,
      {
        authorizedPerson,
        password,
      },
    );

    console.log('LOGIN USER:', `${AppConfig.BaseURL}${apiEndPoints.login}`);
    console.log('Response:', response.data);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const tokenResponse = await axios.get(
      `${AppConfig.BaseURL}${apiEndPoints.token}${authorizedPerson}`,
    );
    console.log('Token Response:', tokenResponse);
    if (tokenResponse.status === 200) {
      const userData = response.data;
      const token = tokenResponse.data.token;

      return {userData, token};
    } else {
      throw new Error('Failed to fetch token');
    }
  } catch (error) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      console.error('No response received from the server');
    } else {
      console.error('Network Error:', error.message);
    }
    throw error;
  }
};
