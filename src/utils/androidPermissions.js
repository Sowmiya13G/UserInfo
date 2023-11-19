import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

export const checkAndRequestPermissions = async () => {
  const readExternalStoragePermission = await check(
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  );
  const writeExternalStoragePermission = await check(
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  );

  if (readExternalStoragePermission !== RESULTS.GRANTED) {
    await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  }

  if (writeExternalStoragePermission !== RESULTS.GRANTED) {
    await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  }
};

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save screenshots.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.error('Error requesting storage permission:', err);
  }
};

// Call the function before capturing the screenshot
requestExternalStoragePermission();
