import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'UserInfo',
      storage: AsyncStorage,
      whitelist: ['authReducer'],
    },
    reducers,
  );

  return persistedReducer;
};
