import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Textfield, Typography } from 'leanui-framework/components';
import './styles.scss';

function Register(props){
  const { onType } = props;
  return(
    <form className="login-form">
      <Typography tag="h5" variant="headline-large-bold">Daftar</Typography>
      <Textfield 
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Nama Lengkap"
        type="text"
        />
      <Textfield
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Email"
        type="text"
      />
      <Textfield
        onChange={function noRefCheck() { }}
        shadow={false}
        title="No Hp"
        type="text"
      />
      <Textfield
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Alamat Lengkap"
        type="text"
        />
      <Textfield
        onChange={function noRefCheck() { }}
        shadow={false}
        title="Password"
        type="password"
        />
      <Button size="48" variant="primary">Daftar</Button>
      <Typography tag="p" variant="caption">Sudah punya akun? <Link to="#" onClick={()=>onType('login')}>login</Link></Typography>
    </form>
  );
}
export default Register;
