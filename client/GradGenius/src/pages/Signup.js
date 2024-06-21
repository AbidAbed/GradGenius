import {useEffect, useState} from 'react';
import retrieveStorageData from '../utils/retrieveStorageData';
import {useDispatch, useSelector} from 'react-redux';
import Form from '../components/Form';
import useConfigFormLogin from '../hooks/useConfigFormLogin';
import {Text, TouchableOpacity, View, Modal} from 'react-native';
import useConfigFormSignUp from '../hooks/useConfigFormSignUp';
import {useNavigation} from '@react-navigation/native';
import {changePath, usePostSignupMutation} from '../store/Store';
import {Toast} from 'toastify-react-native';
import {Button} from 'react-native-paper';

function Signup() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const {token} = useSelector(state => state.config);

  const [responseError, setResponseError] = useState('');

  const [postSignup, postSignupResponse] = usePostSignupMutation();

  const [secretKey, setSecretKey] = useState(null);

  const [isShowSecretKeyModal, setIsShowSecretKeyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSignup(submitedData) {
    const {rePassword, ...userData} = submitedData;
    postSignup(userData);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!postSignupResponse.isLoading && !postSignupResponse.isUninitialized) {
      if (postSignupResponse.isError) {
        Toast.error('Error creating your account');
      } else {
        setSecretKey(postSignupResponse.data.secret2FactorAuth);
        setIsShowSecretKeyModal(true);
        Toast.success('Account created successfully');
      }
      setIsLoading(false);
    }
  }, [postSignupResponse]);
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
      <Modal visible={isShowSecretKeyModal}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#F2F2F2',
          }}>
          <Button
            icon="close-thick"
            mode="contained"
            style={{
              position: 'absolute',
              top: 10,
              right: 0,
              backgroundColor: '#616162',
            }}
            onPress={() => setIsShowSecretKeyModal(false)}>
            Close
          </Button>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>
              Your account was created successfully.{'\n'}
              {'\n'}
              VERY IMPORTANT NOTE PLEASE READ CAREFULLY{'\n'}
              {'\n'}
            </Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 12}}>
              NOTE : YOU MUST COPY THIS SECRET KEY AND SAVE IT IN GOOGLE
              AUTHENTICATOR.{'\n'}
            </Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 12}}>
              YOU WILL NOT BE ABLE TO LOGIN WITHOUT IT , IT'S RECOMANDED TO TAKE
              A SCREENSHOT.{'\n'}
            </Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 12}}>
              NOTE , ONCE YOU FORGET IT YOU NEED TO CANTACT SUPPORT TO CREATE A
              NEW ONE{'\n'}
            </Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 12}}>
              YOUR SECRE KEY : {'\n'}
              {'\n'}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontWeight: 'bold',
                backgroundColor: 'yellow',
              }}>
              {secretKey}
            </Text>
          </View>
        </View>
      </Modal>
      <Form
        isLoading={isLoading}
        configForm={useConfigFormSignUp()}
        responseError={responseError}
        submitIcon={'account-plus'}
        submitStyle={{backgroundColor: '#181819'}}
        submitText={'Register'}
        onSubmit={onSignup}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'gray'}}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
              dispatch(changePath('/login'));
            }}>
            <Text style={{color: '#181819'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
}
export default Signup;
