import emailValidator from '../utils/validators/user/emailValidator';
import passwordValidator from '../utils/validators/user/passwordValidator';
import phoneValidator from '../utils/validators/user/phoneValidator';
import rePasswordValidator from '../utils/validators/user/rePasswordValidator';
import telegramValidator from '../utils/validators/user/telegramValidator';
import usernameValidator from '../utils/validators/user/usernameValidator';

function useConfigFormSignUp(formStateValues) {
  return [
    {
      label: 'Username',
      description: 'example1_',
      validator: usernameValidator,
      stateValue: '',
      stateName: 'username',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Email',
      description: 'example@example.com',
      validator: emailValidator,
      stateValue: '',
      stateName: 'email',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Phone',
      description: '07xxxxxxxx',
      validator: phoneValidator,
      stateValue: '',
      stateName: 'phone',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Telegram Id',
      description: 'example1_',
      validator: telegramValidator,
      stateValue: '',
      stateName: 'telegram',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Password',
      description: 'P@assword1',
      validator: passwordValidator,
      stateValue: '',
      stateName: 'password',
      secureTextEntry: true,
      isHidden: true,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Repeat-Password',
      description: 'P@assword1',
      validator: rePasswordValidator,
      stateValue: '',
      stateName: 'rePassword',
      secureTextEntry: true,
      isHidden: true,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
  ];
}

export default useConfigFormSignUp;
