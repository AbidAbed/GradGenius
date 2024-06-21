function otpCodeValidator(formState, newValue) {
  const regex = /^[0-9]{6}$/;
  if (regex.test(newValue)) {
    return false;
  } else {
    return 'Enter a valid otp code';
  }
}
export default otpCodeValidator;
