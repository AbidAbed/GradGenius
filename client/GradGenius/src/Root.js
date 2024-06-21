import {BASE_BACKEND_URL} from '@env';
import {Text, View} from 'react-native';
import Form from './components/Form';
import useConfigFormSignUp from './hooks/useConfigFormSignUp';
import useConfigFormLogin from './hooks/useConfigFormLogin';
import useConfigFormProject from './hooks/useConfigFormProject';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './pages/Login';
import Signup from './pages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import retrieveStorageData from './utils/retrieveStorageData';
import {useEffect} from 'react';
import ToastManager, {Toast} from 'toastify-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  changeIsLoggedIn,
  changePath,
  changeToken,
  useAuthUserMutation,
} from './store/Store';
import {fetchUser} from './store/slices/UserSlice';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
function Root() {
  const {path, isLoggedIn, token} = useSelector(state => state.config);

  const dispatch = useDispatch();

  const [postAuthUser, postAuthUserResponse] = useAuthUserMutation();

  async function retrieveToken() {
    try {
      const token = await retrieveStorageData({keyName: 'token'});
      console.log(token);

      if (token === null) {
        Toast.error('Session ended');
      } else {
        postAuthUser(token);
      }
    } catch (e) {
      console.log(e);
      Toast.error('Error Retrieving Token');
    }
  }

  useEffect(() => {
    //retrieveToken();
  }, []);

  useEffect(() => {
    if (
      !postAuthUserResponse.isLoading &&
      !postAuthUserResponse.isUninitialized
    ) {
      if (postAuthUserResponse.isError) {
        Toast.error('Invalid token');
      } else {
        Toast.success('Logged in successfully');
        changePath('/projects');
        setTimeout(() => {
          dispatch(changeIsLoggedIn(true));
        }, 2000);
        dispatch(fetchUser({...postAuthUserResponse.data}));
        dispatch(changeToken(postAuthUserResponse.originalArgs));
      }
    }
  }, [postAuthUserResponse]);

  console.log(isLoggedIn);
  return isLoggedIn ? (
    <>
      <ToastManager position={'top'} />
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen name="Login" component={Login} />
          <BottomTab.Screen name="Signup" component={Signup} />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <TopTab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarStyle: {display: 'none'},
            animationEnabled: true,
          }}
          backBehavior="history">
          <TopTab.Screen name="Login" component={Login} />
          <TopTab.Screen name="Signup" component={Signup} />
        </TopTab.Navigator>
      </NavigationContainer>
      <ToastManager position={'top'} />
    </>
  );
}
export default Root;
