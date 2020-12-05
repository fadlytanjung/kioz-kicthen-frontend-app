import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Alert, Button, Textfield, Typography } from 'leanui-framework/components';
import { authlogin } from './action';
import validate from '../Register/validate';
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

function Login(props) {
  const { onType, handleSubmit } = props;

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState({});

  const dispatch = useDispatch();
  const { user } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.loading);
  const { messageError } = useSelector(s => s.auth);

  useEffect(() => {
    if (messageError !== '') {
      setAlert(true);
      setMessage({ message: messageError, type: 'error' });
    } else {
      setAlert(false);
    }
  }, [messageError]);

  const button = useRef(null);
  const login = (value) => {
    const userDetail = user.filter(el => el.email === value.email);
    if (user.findIndex(el => el.email === value.email) < 0) {
      setAlert(true);
      setMessage({ message: 'Email belum terdaftar', type: 'error' });
    } else {
      dispatch(authlogin(value, userDetail));
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(login)}>
      <Typography tag="h5" variant="headline-large-bold">Masuk</Typography>
      {alert && <Alert
        {...message}
      />}
      {renderField('email', 'Email', 'text')}
      {renderField('password', 'Password', 'password')}
      <Button loading={loading} onClick={() => button.current.click()} size="48" type="submit" variant="primary">Masuk</Button>
      <input hidden ref={button} type="submit" />
      <Typography tag="p" variant="caption">Belum punya akun? <Link onClick={() => onType('register')} to="#">daftar</Link></Typography>
    </form>
  );
}


Login.defaultProps = {
  handleSubmit: () => { },
};
Login.propTypes = {
  handleSubmit: PropTypes.func,
};

function mapStateToProps(state) {
  const { login } = state.form;
  const formValues = login;
  return {
    formValues,
  };
}

const Form = reduxForm({
  form: 'login',
  validate,
  enableReinitialize: true,
})(Login);

export default connect(
  mapStateToProps,
  null
)(Form);

Login.defaultProps = {
  onType: () => { },
};

Login.propTypes = {
  onType: PropTypes.func,
};
