import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export const setupFCMListener = async navigation => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'NOTIFICATION CAUSED APP TO OPEN FROM BACKGROUND STATE:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
    await notifee.cancelNotification(remoteMessage.notification.id);
  });

  // Check whether an initial notification is available
  const initialNotification = await messaging().getInitialNotification();
  if (initialNotification) {
    console.log(
      'NOTIFICATION CAUSED APP TO OPEN FROM QUIET STATE:',
      initialNotification.notification,
    );
    await notifee.cancelNotification(initialNotification.notification.id);
  }

  messaging().onMessage(async remoteMessage => {
    console.log('NOTIFICATION IN FOREGROUND STATE', remoteMessage);
    const notification = new notifee.Notification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
    await notifee.displayNotification(notification);
  });
};
