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

    return response.data;
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

export const signupUser = async (authorizedPerson, password) => {
  try {
    const response = await axios.post(
      `${AppConfig.BaseURL}${apiEndPoints.signup}`,
      {
        authorizedPerson,
        password,
      },
    );
    console.log('SIGNUP USER:', `${AppConfig.BaseURL}${apiEndPoints.signup}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
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
