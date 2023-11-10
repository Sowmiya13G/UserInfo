import axios from 'axios';
import {apiEndPoints} from './apiEndPoints';
import {MicroService} from './microService';

export const loginUser = async (authorizedPerson, password) => {
  try {
    const response = await axios.post(
      `${MicroService.M_USER}${apiEndPoints.login}`,
      {
        authorizedPerson,
        password,
      },
    );

    console.log('LOGIN USER:', `${MicroService.M_USER}${apiEndPoints.login}`);
    console.log('Response:', response.data);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const tokenResponse = await axios.get(
      `${MicroService.M_USER}${apiEndPoints.token}${authorizedPerson}`,
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
