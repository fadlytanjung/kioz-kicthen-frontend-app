import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IMAGES } from '../../../../configs';
import { Button, Popup, Textfield, Typography } from 'leanui-framework/components';
import { addCart, check, clickCart, currency } from '../../../../utils/cart';
import { addToCart, fetchUser } from '../../../../pages/Home/action';
import { setAuthData, logOut } from '../../../forms/Login/action';
import { getData, getUserData } from '../../../../utils/common';
import Login from '../../../forms/Login';
import Register from '../../../forms/Register';
import ButtonCart from '../../../elements/ButtonCart';
import './styles.scss';

function Header() {
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [typeOpen, setTypeOpen] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useSelector(s => s.cart);
  const { product } = useSelector(s => s.product);
  const { isLogin, data } = useSelector(s => s.auth);

  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUser());
    if (getUserData() && getData('isLogin')) {
      dispatch(setAuthData(JSON.parse(getUserData()), Boolean(getData('isLogin'))));
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [isLogin]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const total = () => {
    let total = 0;
    cart.map((item) => {
      const data = product.filter(el => el.id === item.id)[0];
      const price = data.price - ((data.price * data.discount) / 100);
      const priceQty = price * item.qty;
      total += priceQty;
    });
    return total;
  };

  const _login = () => { setOpen(true); setTypeOpen('login'); };
  const _logout = () => { dispatch(logOut()); };
  const _register = () => { setOpen(true); setTypeOpen('register'); };

  const _onType = (type) => setTypeOpen(type);

  const _showCart = () => setCartOpen(!cartOpen);
  const _showDropdown = () => setOpenDropdown(!openDropdown);

  const _closeCart = () => setCartOpen(false);

  const pay = () => {
    if (!isLogin) {
      _login();
    } else {
      history.push('/payment');
    }
  };

  const renderIconCart = () => {
    return (
      <div className="cart-icon" onClick={_showCart}>
        <img height="24" src={IMAGES.cart} width="24" />
        {cart.length > 0 && <div className="number-cart">{cart.length}</div>}
      </div>
    );
  };

  const renderProfile = ({ fullname }) => {
    return (
      <div className="dropdown-avatar" ref={wrapperRef}>
        <div className="avatar" onClick={_showDropdown}>
          <img src={IMAGES.avatar} />
          <Typography variant="headline-small-bold">{fullname.length > 9 ? fullname.slice(0, 9) : fullname}</Typography>
        </div>
        {openDropdown &&
          <div className="dropdown-wrapper">
            <ul>
              <li><Link to="/"><img src={IMAGES.avatarDark} /> <Typography tag="p" variant="headline-small">Akun</Typography></Link></li>
              <li><Link to="/"><img src={IMAGES.cartOutline} /> <Typography tag="p" variant="headline-small">Pesanan Saya</Typography></Link></li>
              <li onClick={_logout}><img src={IMAGES.logout} /> <Typography tag="p" variant="headline-small">Keluar</Typography></li>
            </ul>
          </div>}
      </div>
    );
  };

  renderProfile.defaultProps = {
    fullname: '',
  };
  renderProfile.propTypes = {
    fullname: PropTypes.string,
  };

  return (
    <React.Fragment>
      <header>
        <div className="header">
          <div className="container-small fixed-header">
            <Link to="/"><img src={IMAGES.logo} /></Link>
          </div>
        </div>
        <div className="sub-header fixed-header-second top-second">
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
              {isLogin ? renderProfile(data) :
                <React.Fragment>
                  <Button onClick={_register} size="48" variant="primary">Daftar</Button>
                  <Button onClick={_login} size="48" variant="primary">Masuk</Button>
                </React.Fragment>}
              {renderIconCart()}
            </div>
          </div>
        </div>
      </header>
      {(open) &&
        <Popup close height={typeOpen === 'login' ? 502 : 'auto'} onClose={() => setOpen(false)} width={606}>
          {typeOpen === 'login' ?
            <Login onType={_onType} /> : <Register onType={_onType} />}
        </Popup>}
      {cartOpen && <div className="overlay" onClick={_closeCart} />}
      <div className={`cart-container ${cartOpen ? 'show' : 'hidden'}`}>
        <div className="cart-header">
          <div className="cart-header-content">
            <Typography tag="h5" variant="headline-large-bold">Keranjang Belanja</Typography>
            <Typography tag="h6" variant="headline-medium">{cart.length} item</Typography>
            <img onClick={_closeCart} src={IMAGES.close} />
          </div>
        </div>
        <div className="cart-content">
          {cart.length > 0 ? cart.map((item) => {
            const data = product.filter(el => el.id === item.id)[0];
            const price = data.price - ((data.price * data.discount) / 100);
            return (<div className="product-item" key={data.id}>
              <Link to={`/product/${data.slug}`}><img src={data.image} /></Link>
              <div className="product-desc">
                <Link to={`/product/${data.slug}`}><Typography tag="h5" variant="headline-small-bold">{data.name}</Typography></Link>
                {data.discount > 0 && <Typography tag="h3" variant="caption-bold"><strike><span>{data.display_price}</span></strike></Typography>}
                <Typography tag="p" variant="caption-bold">Rp. {currency(price)} <span>/ {data.unit}</span></Typography>
                {check(data.id, cart) !== false ? <ButtonCart maxValue={data.stock}
                  onClick={(num) => clickCart(num, data.id, cart, dispatch, addToCart)}
                  value={check(data.id, cart).qty} /> :
                  <Button onClick={() => addCart(data.id, 'add', cart, dispatch, addToCart)} size="48" variant="primary">Beli</Button>}
              </div>
            </div>);
          }) :
            <div className="empty-cart">
              <Typography tag="p" variant="headline-medium">Anda Belum Memilih Barang</Typography>
            </div>
          }
        </div>
        {cart.length > 0 &&
          <div className="cart-footer">
            <div className="total">
              <Typography tag="h5" variant="headline-medium">Total Harga</Typography>
              <Typography tag="h3" variant="headline-large-bold">Rp. {currency(total())}</Typography>
            </div>
            <div className="pay">
              <Button onClick={pay} variant="primary" >Bayar</Button>
            </div>
          </div>}
      </div>
    </React.Fragment>
  );
}

export default Header;
