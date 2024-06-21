function usernameValidator(formState,newValue) {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]{5,15}$/;
  if (regex.test(newValue)) {
    return false;
  } else {
    return 'Username length must be between 5 and 16 characters';
  }
}
export default usernameValidator;
