import {BASE_BACKEND_URL} from '@env';
import {Text, View, ActivityIndicator, Modal, StyleSheet} from 'react-native';
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
import {useEffect, useState} from 'react';
import ToastManager, {Toast} from 'toastify-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  changeIsLoggedIn,
  changePath,
  changeToken,
  useAuthUserMutation,
} from './store/Store';
import {fetchUser} from './store/slices/UserSlice';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon library you prefer
import LinearGradient from 'react-native-linear-gradient';

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

function GradientHeader({title, icon}) {
  return (
    <LinearGradient
      colors={['#5b5b5c', '#5b5b5c', '#181819', '#49494a']}
      style={styles.headerContainer}>
      <Icon name={icon} size={24} color="#fff" style={styles.headerIcon} />
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
}

function Root() {
  const {path, isLoggedIn, token} = useSelector(state => state.config);

  const dispatch = useDispatch();

  const [postAuthUser, postAuthUserResponse] = useAuthUserMutation();

  const [isLoading, setIsLoading] = useState(true);

  async function retrieveToken() {
    try {
      const token = await retrieveStorageData({keyName: 'token'});
      console.log(token);

      if (token === null) {
        Toast.error('Session ended');
        setIsLoading(false);
      } else {
        postAuthUser(token);
      }
    } catch (e) {
      console.log(e);
      Toast.error('Error Retrieving Token');
    }
  }

  useEffect(() => {
    retrieveToken();
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
        }, 1000);
        dispatch(fetchUser({...postAuthUserResponse.data}));
        dispatch(changeToken(postAuthUserResponse.originalArgs));
      }
      setIsLoading(false);
    }
  }, [postAuthUserResponse]);

  return isLoggedIn ? (
    <>
      <ToastManager position={'top'} />
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let iconName;
              if (route.name === 'My Projects') {
                iconName = focused ? 'work' : 'work-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'About us') {
                iconName = focused ? 'info' : 'info-outline';
              }
              return <Icon name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: '#181819',
            tabBarInactiveTintColor: '#A9A9A9',
            tabBarStyle: {
              backgroundColor: '#F2F2F2',
              height: 60,
              borderTopWidth: 0,
              elevation: 5,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#181819',
              height: 4,
            },
            tabBarIconStyle: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
            },
            tabBarShowIcon: true,
          })}>
          <TopTab.Screen
            name="My Projects"
            component={Projects}
            options={{
              tabBarLabel: 'Projects',
              title: 'My Projects',
              header: () => <GradientHeader title="My Projects" icon="work" />,
            }}
          />
          <TopTab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              title: 'Profile',
              header: () => <GradientHeader title="Profile" icon="person" />,
            }}
          />
          <TopTab.Screen
            name="About us"
            component={AboutUs}
            options={{
              tabBarLabel: 'About',
              title: 'About Us',
              header: () => <GradientHeader title="About Us" icon="info" />,
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <Modal visible={isLoading} transparent={true}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={'#181819'} size={'large'} />
        </View>
      </Modal>
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
