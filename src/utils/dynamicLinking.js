import {Linking} from 'react-native';
import {dynamicLinks} from '@react-native-firebase/dynamic-links';

export const handleDynamicLink = async () => {
  const initialLink = await dynamicLinks().getInitialLink();
  if (initialLink) {
    console.log('Initial dynamic link:', initialLink.url);
  }

  const unsubscribe = dynamicLinks().onLink(link => {
    console.log('Dynamic link:', link.url);
  });

  return () => unsubscribe();
};

export const deepLink = () => {
  const handleDeepLink = event => {
    const {url} = event;
    console.log('Deep link:', url);
  };

  Linking.addEventListener('url', handleDeepLink);

  return () => {
    Linking.removeEventListener('url', handleDeepLink);
  };
};
