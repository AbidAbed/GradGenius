import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Form from '../components/Form';
import useConfigFormLogin from '../hooks/useConfigFormLogin';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  changeIsLoggedIn,
  changePath,
  changeToken,
  usePostLoginMutation,
} from '../store/Store';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'toastify-react-native';
import {fetchUser} from '../store/slices/UserSlice';
import storeDataToStorage from '../utils/storeDataToStorage';
function Login() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {token} = useSelector(state => state.config);
  const [responseError, setResponseError] = useState('');

  const [postLogin, postLoginResponse] = usePostLoginMutation();
  const [isLoading, setIsLoading] = useState(false);

  function onLogin(submitedData) {
    setIsLoading(true);
    postLogin(submitedData);
  }

  useEffect(() => {
    if (!postLoginResponse.isLoading && !postLoginResponse.isUninitialized) {
      if (postLoginResponse.isError) {
        Toast.error('Invalid Credentials');
        setResponseError('Invalid Credentials');
      } else {
        dispatch(fetchUser({...postLoginResponse.data.data}));
        dispatch(changeToken(postLoginResponse.data.headers.authorization));
        storeDataToStorage({
          keyName: 'token',
          value: postLoginResponse.data.headers.authorization,
        });
        dispatch(changeIsLoggedIn(true));
        dispatch(changePath('/projects'));
      }
      setIsLoading(false);
    }
  }, [postLoginResponse]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {/* Should Show the app logo */}
      </View>
      <Form
        isLoading={isLoading}
        configForm={useConfigFormLogin()}
        responseError={responseError}
        submitIcon={'login'}
        submitStyle={{backgroundColor: '#181819'}}
        submitText={'Login'}
        onSubmit={onLogin}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'gray'}}>Don't have account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
                dispatch(changePath('/register'));
              }}>
              <Text style={{color: '#181819'}}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{flexDirection: 'row'}}>
            <Text>Forgot your password? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ResetPassword');
                dispatch(changePath('/ResetPassword'));
              }}>
              <Text style={{color: 'red'}}>Reset password</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </Form>
    </View>
  );
}
export default Login;
