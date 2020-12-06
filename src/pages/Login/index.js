import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { IMAGES, ROUTES } from '../../configs';
import { Alert, Button, Checkbox, Textfield } from 'leanui-framework/components';
import { EyeOff, EyeOn } from 'leanui-framework/components/Icons';
import { fetchUser } from '../Home/action';
import { authlogin } from './action';
import './styles.scss';

export default function Login(props) {
  const [hide, setHide] = useState(true);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState({});
  const [password, setPassword] = useState();
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState();

  const { user } = useSelector(s => s.user);

  const { loading } = useSelector(s => s.loading);
  const { messageError } = useSelector(s => s.auth);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (messageError !== '') {
      setAlert(true);
      setMessage({ message: messageError, type: 'error' });
    } else {
      setAlert(false);
    }
  }, [messageError]);

  const login = () => {
    const userDetail = user.filter(el => el.email === username);
    if (user.findIndex(el => el.email === username) < 0) {
      setAlert(true);
      setMessage({ message: 'Email belum terdaftar', type: 'error' });
    } else {
      dispatch(authlogin({ email: username, password: password }, userDetail));
    }
  };

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={IMAGES.logo} />
      <div className="login-card">
        <section className="login-section">
          <img src={IMAGES.logoAdmin} />
        </section>
        <section className="login-section full-section">
          <h1>
            <p>Selamat Datang di</p>
            <p>Kioz Kitchen Dashboard</p>
          </h1>
          {alert && <Alert
            {...message}
          />}
          <Textfield class-name="login-field"
            // error="Email Tidak Terdaftar" helper="tes"
            onChange={(e) => { setUsername(e.target.value); }}
            placeholder="Ketik email" value={username} width="auto" />
          <Textfield class-name="login-field" clickimage={() => { setHide(!hide); }}
            // error="Password Salah" helper="tes"
            image={hide ? EyeOff : EyeOn}
            onChange={(e) => { setPassword(e.target.value); }}
            placeholder="Ketik Password"
            type={hide ? 'Password' : 'Text'} value={password} width="auto" />
          <Checkbox
            class-name="login-check"
            isChecked={remember}
            label="Ingat Saya"
            onChange={() => { setRemember(!remember); }}
          />
          <Button loading={loading} onClick={login}>
            Masuk
          </Button>
        </section>
      </div>
    </div>
  );
}

Login.defaultProps = {
  actions: {},
  classes: {},
  data: [],
  isLoading: false,
};

Login.propTypes = {
  actions: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};
