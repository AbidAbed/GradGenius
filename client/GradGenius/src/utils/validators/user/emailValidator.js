function emailValidator(formState,newValue) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(newValue)) {
      return false;
    } else {
      return 'Enter a valid email';
    }
}
export default emailValidator;
