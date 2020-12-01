import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Textfield, Typography } from 'leanui-framework/components';
import './styles.scss';

function Login(props){
  const { onType } = props; 
  return(
    <form className="login-form">
      <Typography tag="h5" variant="headline-large-bold">Masuk</Typography>
      <Textfield 
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Email atau Nomor Hp"
        type="text"
        />
      <Textfield
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Password"
        type="password"
        width={212} />
      <Button size="48" variant="primary">Masuk</Button>
      <Typography tag="p" variant="caption">Belum punya akun? <Link to="#" onClick={() => onType('register')}>daftar</Link></Typography>
    </form>
  );
}
export default Login;
