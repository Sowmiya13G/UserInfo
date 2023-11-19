import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Environment,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import strings from '../../../constants/strings';
import {Background} from '../../../components/Background/Background';
import {
  updateProfileImageAction,
  selectDocumentAction,
  clearUserDataAction,
} from '../../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../../constants/theme';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {checkAndRequestPermissions} from '../../../utils/androidPermissions';
export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);
  const [imageSelectionComplete, setImageSelectionComplete] = useState(false);
  const [documentSelectionComplete, setDocumentSelectionComplete] =
    useState(false);

  const imageUri = useSelector(state => state.profileImage.profileImage);
  const documentUri = useSelector(state => state.document.document);

  useEffect(() => {
    const unsubscribeAuthStateChange = auth().onAuthStateChanged(user => {
      if (user) {
        setUserDetails(user);
      } else {
        setUserDetails(null);
      }
    });
    return () => unsubscribeAuthStateChange();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(clearUserDataAction());
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
      setImageSelectionComplete(false);
    } else if (response.error) {
      console.log('ImagePicker Error (Library): ', response.error);
      setImageSelectionComplete(false);
    } else {
      if (!imageSelectionComplete) {
        setImageSelectionComplete(true);
        dispatch(
          updateProfileImageAction(response.uri || response.assets?.[0]?.uri),
        );
      }
    }
  };

  const handleCameraCallback = response => {
    if (response.didCancel) {
      console.log('User canceled taking a photo');
      setImageSelectionComplete(false);
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
      setImageSelectionComplete(false);
    } else {
      if (!imageSelectionComplete) {
        setImageSelectionComplete(true);
        dispatch(
          updateProfileImageAction(response.uri || response.assets?.[0]?.uri),
        );
      }
    }
  };

  const handleSave = () => {};

  const openDocument = async () => {
    try {
      if (documentUri) {
        const filePath = documentUri.uri || documentUri;
        await FileViewer.open(filePath, {showOpenWithDialog: true});
        console.log('Document opened successfully');
      } else {
        Alert.alert('Error', 'Document is undefined or null.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
    }
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      dispatch(
        selectDocumentAction({uri: result[0]?.uri, type: result[0]?.type}),
      );
      setDocumentSelectionComplete(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        documentSelectionComplete(false);
        console.log('Document picker cancelled');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };
  const getFileName = uri => {
    const uriComponents = uri.split('/');
    return uriComponents[uriComponents.length - 1];
  };

  const handleDownloadDocument = async () => {
    await checkAndRequestPermissions();
    if (documentUri && documentUri.uri) {
      const sourcePath = documentUri.uri;
      console.log('sourcePath', sourcePath);
      try {
        const fileName = getFileName(sourcePath);
        const destinationPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;
        // const downloadPath = `${Environment.getExternalStoragePublicDirectory(
        //   Environment.DIRECTORY_DOWNLOADS,
        // )}/${fileName}`;

        await RNFS.copyFile(sourcePath, destinationPath);
        console.log('Downloaded Path:', destinationPath);
        Alert.alert('Downloaded', 'Document downloaded successfully.');
        console.log('Downloaded', 'Document downloaded successfully.');
      } catch (error) {
        console.error('Download error:', error);
        Alert.alert('Error', 'Failed to download the document.');
        console.log('Error', 'Failed to download the document.');
      }
    } else {
      Alert.alert('Error', 'Document URL is undefined or null.');
      console.log('Error', 'Document URL is undefined or null.');
    }
  };

  const renderDocumentIcon = fileType => {
    if (fileType.startsWith('image/')) {
      return <Icon name="file-image-o" size={24} color="blue" />;
    } else if (fileType === 'application/pdf') {
      return <Icon name="file-pdf-o" size={24} color="red" />;
    } else {
      return <Icon name="file-o" size={24} color="black" />;
    }
  };
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSave} style={styles.logOut}>
          <Icon name="save" size={20} color={theme.fontColors.black} />
          <Text style={styles.text}>{strings.save}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logOut}>
          <Text style={styles.text}>{strings.logOut}</Text>
          <Icon name="sign-out" size={20} color={theme.fontColors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <TouchableOpacity style={styles.editIcon} onPress={handleImageUpload}>
          <Icon name="edit" size={20} color={theme.fontColors.black} />
        </TouchableOpacity>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.profileIcon}>
            <Icon name="user-circle-o" size={100} color="gray" />
          </View>
        )}
      </View>

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
      {documentUri && (
        <TouchableOpacity
          onPress={openDocument}
          style={styles.documentContainer}>
          {renderDocumentIcon(documentUri.type)}
          <Text style={styles.documentText}>
            {getFileName(documentUri.uri)}
          </Text>
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
