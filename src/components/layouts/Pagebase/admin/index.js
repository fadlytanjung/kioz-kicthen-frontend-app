import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, SearchBox, Typography } from 'leanui-framework/components';
import { HomeJs, ProfileJs, LineChartJs, CalendarJs,  } from 'leanui-framework/components/Icons';
import Report from './Report';
import Transaction from './Transaction';
import { IMAGES, ROUTES } from '../../../../configs';
import { clearStorages, getUserData } from '../../../../utils/common';
import './style.css';
import { useHistory } from 'react-router-dom';

export default function Pagebase(props) {
  const [nav, changeNav] = useState('large');
  const [iconOnly, changeIconOnly] = useState(undefined);
  const history = useHistory();
  const clickNav = () => {
    changeNav(nav === 'large' ? 'small' : 'large');
    changeIconOnly(iconOnly === 'true' ? undefined : 'true');
  };

  const logout = () => {
    clearStorages();
    location.href = ROUTES.LOGIN();
  };

  const toPage = (page) =>{
    history.push(page);
  };

  const menuSetting = () => (
    <section className="header-right-content">
      <Typography bold="true" tag="label" variant="body">Hi, {JSON.parse(getUserData()).fullname}</Typography>
      <div>
        <Typography tag="label" variant="caption">{JSON.parse(getUserData()).role}</Typography>
      </div>
    </section>
  );

  const active = (path) => history.location.pathname === path ? { active: true } : {};

  return (
    <div className="page-layout">
      <Drawer icon-large={IMAGES.logo} icon-small={IMAGES.logo}
        label-nav="Sembunyikan Menu"
        onClickNav={clickNav} variant={nav}>
        <List>
          <ListItem {...active('/products')} center={iconOnly} icon={HomeJs} icon-only={iconOnly} onClick={()=>toPage('/products')}>
            Produk
          </ListItem>
          <ListItem {...active('/user')} center={iconOnly} icon={ProfileJs} icon-only={iconOnly} onClick={() =>toPage('/user')}>
            User
          </ListItem>
          <ListItem {...active('/order')} center={iconOnly} icon={CalendarJs} icon-only={iconOnly} onClick={() =>toPage('/order')}>
            Pesanan
          </ListItem>
          <ListItem {...active('/history-transaction')} center={iconOnly} icon={Transaction} icon-only={iconOnly} onClick={() =>toPage('/history-transaction')}>
            Riwayat Transaksi
          </ListItem>
          <ListItem {...active('/report')} center={iconOnly} icon={Report} icon-only={iconOnly} onClick={() =>toPage('/report')}>
            Laporan Penjualan
          </ListItem>
          <ListItem {...active('/prediction')} center={iconOnly} icon={LineChartJs} icon-only={iconOnly} onClick={() =>toPage('/prediction')}>
            Prediksi Penjualan
          </ListItem>
        </List>
      </Drawer>
      <div className="page-content-wrapper">
        <header className="header">
          <section className="header-left">
            <SearchBox placeholder="Ketik disini untuk memulai pencarian ... " shadow="true" width="inherit" />
          </section>
          <section className="header-right">
            {menuSetting()}
            <section className="header-menu" onClick={logout}>
              <Typography tag="label" variant="body">Keluar</Typography>
            </section>
          </section>
        </header>
        {props.children}
      </div>
    </div>
  );
}

Pagebase.defaultProps = {
  children: {},
};

Pagebase.propTypes = {
  children: PropTypes.object
};
