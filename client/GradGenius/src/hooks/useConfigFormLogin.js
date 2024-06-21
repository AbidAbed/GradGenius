import emailValidator from '../utils/validators/user/emailValidator';
import otpCodeValidator from '../utils/validators/user/otpCodeValidator';
import passwordValidator from '../utils/validators/user/passwordValidator';

function useConfigFormLogin(formStateValues) {
  return [
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
      label: 'Otp code (from google authenticator)',
      description: '123456',
      validator: otpCodeValidator,
      stateValue: '',
      stateName: 'otp_code',
      secureTextEntry: true,
      isHidden: true,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
  ];
}
export default useConfigFormLogin;
