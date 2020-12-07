import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Admin from './component';

function mapStateToProps(state) {
  const { user = {} } = state.form;
  const { detail } = state.user;
  const formValues = user.values;

  return {
    // content,
    formValues,
    initialValues: detail,
  };
}

const Form = reduxForm({
  form: 'user',
  enableReinitialize: true,
})(Admin);

export default connect(
  mapStateToProps,
  null,
)(Form);


