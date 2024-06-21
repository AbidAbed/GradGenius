import {Children, useEffect, useReducer, useState} from 'react';
import useFormStateinitializer from '../hooks/useFormStateinitializer';
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {TextInput, IconButton, Button, Drawer} from 'react-native-paper';
import EyeSecure from 'react-native-vector-icons/Feather';

function Form({
  onSubmit,
  submitText,
  submitStyle,
  submitIcon,
  configForm,
  responseError,
  children,
  isLoading,
}) {
  const [configFormObjectState, setConfigFormObjectState] = useState(
    configForm.reduce((prev, curr) => {
      return {...prev, [curr.stateName]: {...curr}};
    }, {}),
  );

  const [responseErrorState, setResponseErrorState] = useState(responseError);
  const [isLoadingForm, setIsLoadingForm] = useState(isLoading);

  function onInputChange(stateName, newValue, validator) {
    const validationResult = validator(configFormObjectState, newValue);
    setResponseErrorState('');
    if (validationResult) {
      setConfigFormObjectState({
        ...configFormObjectState,
        [stateName]: {
          ...configFormObjectState[stateName],
          isValidationError: true,
          validationError: validationResult,
          stateValue: newValue,
        },
      });
    } else {
      setConfigFormObjectState({
        ...configFormObjectState,
        [stateName]: {
          ...configFormObjectState[stateName],
          isValidationError: false,
          validationError: '',
          stateValue: newValue,
        },
      });
    }
  }

  function submit() {
    const isError = Object.values(configFormObjectState).find(
      configElement => configElement.isValidationError,
    );

    if (isError || responseErrorState !== '') {
      setResponseErrorState('Fix the previous errors');
    } else {
      const data = Object.entries(configFormObjectState).reduce(
        (prev, curr) => {
          return {...prev, [curr[0]]: curr[1].stateValue};
        },
        {},
      );
      setConfigFormObjectState(
        configForm.reduce((prev, curr) => {
          return {...prev, [curr.stateName]: {...curr, stateValue: ''}};
        }, {}),
      );
      onSubmit(data);
    }
  }

  useEffect(() => {
    setResponseErrorState(responseError);
  }, [responseError]);

  useEffect(() => {
    setIsLoadingForm(isLoading);
  }, [isLoading]);

  return (
    <GestureHandlerRootView style={{flexGrow: 1}}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          padding: '3%',
        }}>
        {Object.values(configFormObjectState).map(configElement => {
          // console.log(configElement);
          return (
            <View
              key={configElement.label}
              style={{
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: '1%',
                  justifyContent: 'flex-end',
                }}>
                <TextInput
                  error={configElement.isValidationError}
                  style={{flex: 1}}
                  secureTextEntry={
                    configElement.secureTextEntry && configElement.isHidden
                  }
                  theme={{
                    colors: {
                      primary: '#181819',
                      underlineColor: '#8d0000',
                      error: '#8d0000',
                    },
                  }}
                  mode="outlined"
                  placeholder={configElement.description}
                  label={configElement.label}
                  value={configElement.stateValue}
                  onChangeText={text =>
                    onInputChange(
                      configElement.stateName,
                      text,
                      configElement.validator,
                    )
                  }
                />
                {configElement.secureTextEntry && (
                  <EyeSecure
                    style={{
                      paddingLeft: '2%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    name={configElement.isHidden ? 'eye-off' : 'eye'}
                    onPress={() =>
                      setConfigFormObjectState({
                        ...configFormObjectState,
                        [configElement.stateName]: {
                          ...configElement,
                          isHidden: !configElement.isHidden,
                        },
                      })
                    }
                    size={20}
                  />
                )}
              </View>
              {configElement.isValidationError && (
                <View style={{paddingLeft: '2%'}}>
                  <Text style={{color: '#8d0000', textAlign: 'left', fontSize: 12}}>
                    {configElement.validationError}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
        <View style={{paddingTop: '2%'}}>
          <Button
            loading={isLoadingForm}
            icon={submitIcon}
            mode="contained"
            style={[submitStyle, {alignSelf: 'flex-end'}]}
            onPress={() => submit()}>
            {submitText}
          </Button>

          {responseErrorState !== '' && (
            <View style={{paddingLeft: '2%'}}>
              <Text style={{color: '#8d0000', textAlign: 'left', fontSize: 12}}>
                {responseErrorState}
              </Text>
            </View>
          )}
          {children}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
export default Form;
