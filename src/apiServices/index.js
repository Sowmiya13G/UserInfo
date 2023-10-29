// import axios from 'axios';
// import {BaseURL} from '../config/AppConfig';
// import {apiEndPoints} from './apiEndPoints';

// export const signupUser = async (authorizedPerson, password) => {
//   try {
//     const response = await fetch(`${BaseURL}/${apiEndPoints.SIGNUP}`, {
//       method: 'POST',
//       body: JSON.stringify({authorizedPerson, password}),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log(`${BaseURL}/${apiEndPoints.SIGNUP}`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const loginUser = async (authorizedPerson, password) => {
//   try {
//     const response = await axios(`${BaseURL}/${apiEndPoints.login}`, {
//       method: 'POST',
//       body: JSON.stringify({authorizedPerson, password}),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log('error:', error);
//   }
// };

import axios from 'axios';
import {BaseURL} from '../config/AppConfig';
import {apiEndPoints} from './apiEndPoints';

export const signupUser = async (authorizedPerson, password) => {
  try {
    const response = await axios.post(`${BaseURL}/${apiEndPoints.SIGNUP}`, {
      authorizedPerson,
      password,
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (authorizedPerson, password) => {
  try {
    const response = await axios.post(`${BaseURL}/${apiEndPoints.login}`, {
      authorizedPerson,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('error:', error);
    throw error;
  }
};
