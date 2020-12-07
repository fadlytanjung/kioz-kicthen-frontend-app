import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Admin from './component';

function mapStateToProps(state) {
  const { product = {} } = state.form;
  const { detail } = state.detail;
  const formValues = product.values;

  return {
    // content,
    formValues,
    initialValues: detail,
  };
}

const Form = reduxForm({
  form: 'product',
  enableReinitialize: true,
})(Admin);

export default connect(
  mapStateToProps,
  null,
)(Form);


