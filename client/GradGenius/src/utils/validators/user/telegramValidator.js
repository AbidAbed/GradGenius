function telegramValidator(formState, newValue) {
  const regex = /^(?=.{5,32}$)[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/;
  if (regex.test(newValue)) {
    return false;
  } else {
    return 'Enter a valid telegram user';
  }
}
export default telegramValidator;
