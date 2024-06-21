function rePasswordValidator(formState, newValue) {
  if (newValue === formState.password.stateValue) {
    return false;
  } else {
    return 'Password and repeated password must match';
  }
}
export default rePasswordValidator;
