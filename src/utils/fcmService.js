import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
  } catch (error) {
    console.log(error);
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function setupFCMListener() {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  messaging().onMessage(async remoteMessage => {
    console.log('NOTIFICATION IN FOREGROUND STATE', remoteMessage);
    const {title, body} = remoteMessage.notification;
    try {
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  });
}
