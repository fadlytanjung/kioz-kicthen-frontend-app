import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, ListItem, SearchBox, Typography } from 'leanui-framework/components';
import { HomeJs, ProfileJs } from 'leanui-framework/components/Icons';
import { IMAGES, ROUTES } from '../../../../configs';
import { clearStorages } from '../../../../utils/common';

import './style.css';

export default function Pagebase(props) {
  const [nav, changeNav] = useState('large');
  const [iconOnly, changeIconOnly] = useState(undefined);

  const clickNav = () => {
    changeNav(nav === 'large' ? 'small' : 'large');
    changeIconOnly(iconOnly === 'true' ? undefined : 'true');
  };

  const logout = () => {
    clearStorages();
    location.href = ROUTES.LOGIN();
  };

  const menuSetting = () => (
    <section className="header-right-content">
      <Typography bold="true" tag="label" variant="body">Hi, indiboxanalytics</Typography>
      <div>
        <Typography tag="label" variant="caption">Admin</Typography>
      </div>
    </section>
  );

  return (
    <div className="page-layout">
      <Drawer icon-large={IMAGES.logo} icon-small={IMAGES.logo}
        label-nav="Sembunyikan Menu"
        onClickNav={clickNav} variant={nav}>
        <List>
          <ListItem active="true" center={iconOnly} icon={HomeJs} icon-only={iconOnly}>
            Produk
          </ListItem>
          <ListItem center={iconOnly} icon={ProfileJs} icon-only={iconOnly}>
            User
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
