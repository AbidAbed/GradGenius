function useFormStateinitializer(formConfig) {
  console.log(formConfig);
  const initilizedFormState = formConfig.reduce((prev, curr) => {
    return {...prev, [curr.stateName]: ''};
  }, {});

  return initilizedFormState;
}
export default useFormStateinitializer;
