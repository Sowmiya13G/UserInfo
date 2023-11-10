import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

export default downloadService = () => {
  if (document) {
    const fileExtension = document.name.split('.').pop();
    const fileName = `downloaded_document.${fileExtension}`;
    const destinationPath = `${RNFS.ExternalStorageDirectoryPath}/${fileName}`;

    RNFS.downloadFile({
      fromUrl: document.uri,
      toFile: destinationPath,
    })
      .promise.then(response => {
        if (response.statusCode === 200) {
          Alert.alert('Downloaded', 'Document downloaded successfully.');
        } else {
          Alert.alert('Error', 'Failed to download the document.');
        }
      })
      .catch(error => {
        console.error('Download error:', error);
        Alert.alert('Error', 'Failed to download the document.');
      });
  } else {
    Alert.alert('Error', 'Document is undefined or null.');
  }
};
