function phoneValidator(formState, newValue) {
  const regex = /^07\d{8}$/;
  if (regex.test(newValue)) {
    return false;
  } else {
    return 'Enter a valid mobile number';
  }
}
export default phoneValidator;
