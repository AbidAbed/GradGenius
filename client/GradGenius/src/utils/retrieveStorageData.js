import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'toastify-react-native';

async function retrieveStorageData(data, successMessage) {
  try {
    const value = await AsyncStorage.getItem(data.keyName);
    if (value !== null) {
      if (successMessage) Toast.success(successMessage);
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.log('Error reading storage');
    Toast.error('Error reading storage');
    console.log(e);
    return false;
  }
}
export default retrieveStorageData;
