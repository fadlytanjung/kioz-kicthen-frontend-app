import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Admin from './component';

function mapStateToProps(state) {
  const { AdminForm = {} } = state.form;
  const { admin } = state.admins;
  const formValues = AdminForm.values;

  return {
    // content,
    formValues,
    initialValues: admin,
  };
}

const Form = reduxForm({
  form: 'AdminForm',
  enableReinitialize: true,
})(Admin);

export default connect(
  mapStateToProps,
  null,
)(Form);


