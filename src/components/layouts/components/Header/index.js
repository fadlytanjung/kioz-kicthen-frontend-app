import React from 'react';
import { useSelector } from 'react-redux';
import { IMAGES } from '../../../../configs';
import { Button, Textfield } from 'leanui-framework/components';
import { Link } from 'react-router-dom';
import './styles.scss';

function Header(){
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const { cart } = useSelector(s=>s.cart);
  return(
    <header>
      <div className="container-small">
        <Link to="/"><img src={IMAGES.logo}/></Link>
      </div>
      <div className="sub-header">
        <div className="wrapper">
          <div className="search-wrap">
            <Textfield
              clickimage={() => { }}
              disabled={false}
              image={IMAGES.search}
              onChange={()=>{}}
              placeholder="Cari"
              shadow={false}
              type="text"
              width={width>991&&499}
            />
          </div>
          <div className="cart-wrap">
            <Button size="48" variant="primary">Daftar</Button>
            <Button size="48" variant="primary">Masuk</Button>
            <div className="cart-icon">
              <img height="24" src={IMAGES.cart} width="24"/>
              {cart.length>0&&<div className="number-cart">{cart.length}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
