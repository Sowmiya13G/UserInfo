import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import strings from '../../../constants/strings';
import {Background} from '../../../components/Background/Background';
import {
  updateProfileImageAction,
  removeProfileImageAction,
} from '../../../redux/actions/authAction';
import {useDispatch} from 'react-redux';
import theme from '../../../constants/theme';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUserDetails(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    Alert.alert(
      'Choose Image Source',
      'Select an image source:',
      [
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(options, handleImageLibraryCallback);
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(options, handleCameraCallback);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleImageLibraryCallback = response => {
    if (response.didCancel) {
      console.log('User canceled image library');
    } else if (response.error) {
      console.log('ImagePicker Error (Library): ', response.error);
    } else {
      const profileImage = response.uri || response.assets?.[0]?.uri;
      console.log('Selected image URI from gallery:', profileImage);
      setProfileImage(profileImage);
      dispatch(updateProfileImageAction(profileImage));
    }
  };

  const handleCameraCallback = response => {
    if (response.didCancel) {
      console.log('User canceled taking a photo');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      const profileImage = response.uri || response.assets?.[0]?.uri;
      setProfileImage(profileImage);
      dispatch(updateProfileImageAction(profileImage));
    }
  };
  const handleRemoveImage = () => {
    setProfileImage(null);
    dispatch(removeProfileImageAction());
  };

  const handleDownloadProfileImage = () => {
    if (profileImage) {
      const fileExtension = profileImage.split('.').pop();
      const fileName = `profile_image.${fileExtension}`;
      const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

      RNFS.downloadFile({
        fromUrl: profileImage,
        toFile: destinationPath,
      })
        .promise.then(response => {
          if (response.statusCode === 200) {
            Alert.alert(
              'Downloaded',
              'Profile picture downloaded successfully.',
            );
          } else {
            Alert.alert('Error', 'Failed to download the profile picture.');
          }
        })
        .catch(error => {
          console.error('Download error:', error);
          Alert.alert('Error', 'Failed to download the profile picture.');
        });
    } else {
      Alert.alert('Error', 'Profile image is undefined or null.');
    }
  };

  const openDocument = () => {
    if (document) {
      FileViewer.open(document.uri, {showOpenWithDialog: true})
        .then(() => {
          console.log('Document opened successfully');
        })
        .catch(error => {
          console.error('Error opening document:', error);
        });
    } else {
      Alert.alert('Error', 'Document is undefined or null.');
    }
  };
  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result);
      setDocument(result[0]);
      setDocumentUrl(result[0]?.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleDownloadDocument = () => {
    if (documentUrl) {
      console.log('Document URL:', documentUrl);
      const fileExtension = documentUrl.split('.').pop();
      const fileName = `downloaded_document.${fileExtension}`;
      const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

      RNFS.downloadFile({
        fromUrl: documentUrl,
        toFile: destinationPath,
      })
        .promise.then(response => {
          if (response.statusCode === 200) {
            Alert.alert('Downloaded', 'Document downloaded successfully.');
            console.log('Downloaded', 'Document downloaded successfully.');
          } else {
            Alert.alert('Error', 'Failed to download the document.');
            console.log('Error', 'Failed to download the document.');
          }
        })
        .catch(error => {
          console.error('Download error:', error);
          Alert.alert('Error', 'Failed to download the document.');
          console.log('Error', 'Failed to download the document.');
        });
    } else {
      Alert.alert('Error', 'Document URL is undefined or null.');
      console.log('Error', 'Document URL is undefined or null.');
    }
  };
  return (
    <View style={styles.container}>
      <Background />
      <TouchableOpacity onPress={handleLogout} style={styles.logOut}>
        <Text style={styles.text}>{strings.logOut}</Text>
        <Icon name="sign-out" size={20} color={theme.fontColors.black} />
      </TouchableOpacity>
      <View style={styles.profile}>
        <TouchableOpacity style={styles.editIcon} onPress={handleImageUpload}>
          <Icon name="edit" size={20} color={theme.fontColors.black} />
        </TouchableOpacity>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <View style={{width: 100, height: 100, marginRight: 15}}>
            <Icon name="user-circle-o" size={100} color="gray" />
          </View>
        )}
        {profileImage && (
          <TouchableOpacity onPress={handleRemoveImage}>
            <Text style={styles.detailsText}>{strings.removeProf}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleDownloadProfileImage}
        style={styles.downloadFile}>
        <Text style={styles.text}>Download Profile Picture</Text>
        <Icon name="download" size={17} color={theme.fontColors.black} />
      </TouchableOpacity>
      {userDetails ? (
        <View>
          <View style={styles.details}>
            <Icon name="user" size={25} color={theme.fontColors.black} />
            <Text style={styles.detailsText}>{userDetails.email}</Text>
          </View>
          <View style={styles.details}>
            <Icon name="star" size={25} color={theme.fontColors.black} />
            <Text style={styles.detailsText}>{userDetails.displayName}</Text>
          </View>
        </View>
      ) : (
        <Text>{strings.loading}</Text>
      )}
      <TouchableOpacity
        onPress={handleDocumentUpload}
        style={styles.uploadFile}>
        <Text style={styles.text}>Upload Document</Text>
        <Icon name="upload" size={17} color={theme.fontColors.black} />
      </TouchableOpacity>
      {document && (
        <TouchableOpacity
          onPress={openDocument}
          style={styles.documentContainer}>
          <Text style={styles.documentText}>{document.name}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={handleDownloadDocument}
        style={styles.uploadFile}>
        <Text style={styles.text}>Download Document</Text>
        <Icon name="download" size={17} color={theme.fontColors.black} />
      </TouchableOpacity>
    </View>
  );
}

// const handleDocumentDownload = async () => {
//   if (document) {
//     const fileExtension = document.name.split('.').pop();
//     const fileName = `downloaded_document.${fileExtension}`;
//     const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

//     try {
//       if (document.uri.startsWith('content://')) {
//         await RNFS.copyAssetsFile(document.uri, destinationPath);
//       } else {
//         // Otherwise, use standard download
//         await RNFS.downloadFile({
//           fromUrl: document.uri,
//           toFile: destinationPath,
//         }).promise;
//       }

//       Alert.alert('Downloaded', 'Document downloaded successfully.');
//     } catch (error) {
//       console.error('Download error:', error);
//       Alert.alert('Error', 'Failed to download the document.');
//     }
//   } else {
//     Alert.alert('Error', 'Document is undefined or null.');
//   }
// };

// const handleDocumentDownload = () => {
//   if (document) {
//     const fileExtension = document.name.split('.').pop();
//     const fileName = `downloaded_document.${fileExtension}`;
//     const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

//     RNFS.downloadFile({
//       fromUrl: document.uri,
//       toFile: destinationPath,
//     })
//       .promise.then(response => {
//         if (response.statusCode === 200) {
//           Alert.alert('Downloaded', 'Document downloaded successfully.');
//         } else {
//           Alert.alert('Error', 'Failed to download the document.');
//         }
//       })
//       .catch(error => {
//         console.error('Download error:', error);
//         Alert.alert('Error', 'Failed to download the document.');
//       });
//   } else {
//     Alert.alert('Error', 'Document is undefined or null.');
//   }
// };

// const handleDocumentUpload = async () => {
//   try {
//     const result = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });

//     console.log(result);
//     setDocument(result[0]);

//     FileViewer.open(result[0].uri, {showOpenWithDialog: true})
//       .then(() => {
//         console.log('Document opened successfully');
//       })
//       .catch(error => {
//         console.error('Error opening document:', error);
//       });
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       console.log('Document picker cancelled');
//     } else {
//       console.error('Error picking document:', err);
//     }
//   }
// };

// const handleDocumentDownload = () => {
//   if (document) {
//     const fileExtension = document.name.split('.').pop();
//     const fileName = `downloaded_document.${fileExtension}`;
//     const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

//     if (document.uri.startsWith('content://')) {
//       // If the URI scheme is "content", use DocumentPicker's contentResolver
//       RNFS.copyAssetsFile(document.uri, destinationPath, 0, 0)
//         .then(() => {
//           Alert.alert('Downloaded', 'Document downloaded successfully.');
//         })
//         .catch(error => {
//           console.error('Download error:', error);
//           Alert.alert('Error', 'Failed to download the document.');
//         });
//     } else {
//       RNFS.downloadFile({
//         fromUrl: document.uri,
//         toFile: destinationPath,
//       })
//         .promise.then(response => {
//           if (response.statusCode === 200) {
//             Alert.alert('Downloaded', 'Document downloaded successfully.');
//           } else {
//             Alert.alert('Error', 'Failed to download the document.');
//           }
//         })
//         .catch(error => {
//           console.error('Download error:', error);
//           Alert.alert('Error', 'Failed to download the document.');
//         });
//     }
//   } else {
//     Alert.alert('Error', 'Document is undefined or null.');
//   }
// };
