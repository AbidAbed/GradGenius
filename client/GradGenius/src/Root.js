import {BASE_BACKEND_URL} from '@env';
import {Text, View} from 'react-native';
function Root() {
  return (
    <View>
      <Text>
        {BASE_BACKEND_URL}
      </Text>
    </View>
  );
}
export default Root;
