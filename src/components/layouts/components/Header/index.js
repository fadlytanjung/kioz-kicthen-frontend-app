import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IMAGES } from '../../../../configs';
import { Button, Popup, Textfield } from 'leanui-framework/components';
import { Link } from 'react-router-dom';
import Login from '../../../forms/Login';
import Register from '../../../forms/Register';
import './styles.scss';

function Header() {
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const [open, setOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(null);
  const { cart } = useSelector(s => s.cart);

  const _login = () => { setOpen(true); setTypeOpen('login'); };
  const _register = () => { setOpen(true); setTypeOpen('register'); };

  const _onType = (type) => setTypeOpen(type);

  return (
    <React.Fragment>
      <header>
        <div className="container-small">
          <Link to="/"><img src={IMAGES.logo} /></Link>
        </div>
        <div className="sub-header">
          <div className="wrapper">
            <div className="search-wrap">
              <Textfield
                clickimage={() => { }}
                disabled={false}
                image={IMAGES.search}
                onChange={() => { }}
                placeholder="Cari"
                shadow={false}
                type="text"
                width={width > 991 && 499}
              />
            </div>
            <div className="cart-wrap">
              <Button onClick={_register} size="48" variant="primary">Daftar</Button>
              <Button onClick={_login} size="48" variant="primary">Masuk</Button>
              <div className="cart-icon">
                <img height="24" src={IMAGES.cart} width="24" />
                {cart.length > 0 && <div className="number-cart">{cart.length}</div>}
              </div>
            </div>
          </div>
        </div>
      </header>
      {(open) &&
        <Popup close height={typeOpen === 'login' ? 502 : 752} onClose={() => setOpen(false)} width={606}>
          {typeOpen === 'login' ?
            <Login onType={_onType} /> : <Register onType={_onType} />}
        </Popup>}
    </React.Fragment>
  );
}

export default Header;
