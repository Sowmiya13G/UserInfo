import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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
