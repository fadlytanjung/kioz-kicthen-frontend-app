import validateInput from '../../../utils/validateInput';

const validate = values => {
  const {
    field1,
    field2,
  } = values;
  const errors = {
    field1: validateInput(field1, ['required']),
    field2: validateInput(field2, ['required']),
  };

  return errors;
};


export default validate;