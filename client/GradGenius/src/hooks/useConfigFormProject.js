import deadlineValidator from '../utils/validators/project/deadlineValidator';
import documentationFileValidator from '../utils/validators/project/documentationFileValidator';
import isWithDocumentationValidator from '../utils/validators/project/isWithDocumentationValidator';
import projectNameValidator from '../utils/validators/project/projectNameValidator';
import teamSizeValidator from '../utils/validators/project/teamSizeValidator';

function useConfigFormProject(formStateValues) {
  return [
    {
      label: 'Project Name',
      description: '',
      validator: projectNameValidator,
      stateValue: '',
      stateName: 'name',
      stateValue: '',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Documentation File Name',
      description: '',
      validator: documentationFileValidator,
      stateValue: '',
      stateName: 'documentationFileName',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Deadline',
      description: '',
      validator: deadlineValidator,
      stateValue: '',
      stateName: 'deadline',
      stateValue: '',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Team Size',
      description: '',
      validator: teamSizeValidator,
      stateValue: '',
      stateName: 'teamSize',
      stateValue: '',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
    {
      label: 'Is Documnentation Available',
      description: '',
      validator: isWithDocumentationValidator,
      stateValue: '',
      stateName: 'isWithDocumentation',
      stateValue: '',
      secureTextEntry: false,
      isValidationError: true,
      validationError: 'Not allowed to be empty',
    },
  ];
}
export default useConfigFormProject;
