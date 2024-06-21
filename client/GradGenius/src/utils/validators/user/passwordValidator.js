function passwordValidator(formState, newValue) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  if (regex.test(newValue)) {
    return false;
  } else {
    return 'Password length must be between 8 and 16,and must contain at least one lowercase letter, one uppercase letter, one digit,and one special character';
  }
}
export default passwordValidator;
