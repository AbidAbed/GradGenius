import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'toastify-react-native';

async function storeDataToStorage(data, successMessage) {
  try {
    const jsonValue = JSON.stringify(data.value);
    await AsyncStorage.setItem(data.keyName, jsonValue);
    Toast.success(successMessage);

    return true;
  } catch (e) {
    console.log('Error saving to storage');
    Toast.error('Error saving to storage');
    console.log(e);
    return false;
  }
}
export default storeDataToStorage;
