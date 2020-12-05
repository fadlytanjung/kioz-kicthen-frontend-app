import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Textfield, Typography } from 'leanui-framework/components';
import { Field, reduxForm, reset } from 'redux-form';
import { addUser } from './action';
import { highValue } from '../../../utils/cart';
import validate from './validate';
import './styles.scss';

export const inputField = (props) => {
  const { meta: { error, touched } } = props;
  const errorMessage = error && touched && error;
  return (
    <React.Fragment>
      <Textfield {...props} />
      {errorMessage && <span style={{ color: '#F04F41', fontSize: 14 }}>{errorMessage}</span>}
    </React.Fragment>
  );

};

inputField.defaultProps = {
  meta: {}
};

inputField.propTypes = {
  meta: PropTypes.object
};

export const renderField = (name, title, type) => {
  return <Field component={inputField} name={name} shadow={false} title={title} type={type} />;
};

function Register(props) {
  const { onType, handleSubmit } = props;
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState({});
  const button = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.loading);

  const register = value => {
    if (user.findIndex(el => el.email === value.email) >= 0) {
      setAlert(true);
      setMessage({ message: 'Email sudah terdaftar', type: 'error' });
      dispatch(reset('register'));
    } else {
      dispatch(addUser({ ...value, role: 'user', id: user.length > 0 ? highValue(user).id + 1 : 1 }));
      setAlert(true);
      setMessage({ message: 'Pendaftaran Berhasil, silahkan login', type: 'success' });
      dispatch(reset('register'));
    }

  };

  return (
    <form className="login-form" onSubmit={handleSubmit(register)}>
      <Typography tag="h5" variant="headline-large-bold">Daftar</Typography>
      {alert && <Alert
        {...message}
      />}
      {renderField('fullname', 'Nama Lengkap', 'text')}
      {renderField('email', 'Email', 'email')}
      {renderField('password', 'Password', 'password')}
      {renderField('phone', 'No Hp', 'text')}
      {renderField('address', 'Alamat Lengkap', 'text')}
      <Button loading={loading} onClick={() => button.current.click()} size="48" type="submit" variant="primary">Daftar</Button>
      <input hidden ref={button} type="submit" />
      <Typography tag="p" variant="caption">Sudah punya akun? <Link onClick={() => onType('login')} to="#" >login</Link></Typography>
    </form>
  );
}

Register.defaultProps = {
  handleSubmit: ()=>{},
};
Register.propTypes = {
  handleSubmit: PropTypes.func,
};

function mapStateToProps(state) {
  const { register } = state.form;
  const formValues = register;
  return {
    formValues,
  };
}

const Form = reduxForm({
  form: 'register',
  validate,
  enableReinitialize: true,
})(Register);

export default connect(
  mapStateToProps,
  null
)(Form);

Register.defaultProps = {
  onType: () => { },
};

Register.propTypes = {
  onType: PropTypes.func,
};
