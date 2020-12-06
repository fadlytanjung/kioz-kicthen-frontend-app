/*eslint-disable no-unused-vars, react/jsx-max-depth*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagebase from '../../components/layouts/Pagebase/payment';
import { Button, Dropdown, Textfield, Typography } from 'leanui-framework/components';
import { IMAGES } from '../../configs';
import './styles.scss';

function Billing() {

  return (
    <Pagebase back={false} >
      <section className="container-payment">
        <div className="container-small">
          <div className="card-billing">
            <div className="info">
              <img src={IMAGES.cart} />
              <Typography tag="h4" variatn="headline-small-bold">Segera bayar belanjaan kamu</Typography>
            </div>
            <div className="barcode">
              <img src={IMAGES.barcode} />
            </div>
            <div className="info limit">
              <Typography tag="h4" variatn="headline-small-bold">Batas Waktu Tagihan</Typography>
              <Typography tag="h5" variatn="headline-small-bold">12.13 WIB</Typography>
            </div>
            <div className="detail">
              <Typography tag="h4" variatn="headline-small-bold">Total Pembayaran</Typography>
              <Typography tag="h5" variatn="headline-small-bold">Rp. 160.000</Typography>
            </div>
            <div className="detail">
              <Typography tag="h4" variatn="headline-small-bold">Metode Pembayaran</Typography>
              <img src={IMAGES.linkaja} />
            </div>
            <div className="detail no-border">
              <Typography tag="h4" variatn="headline-small-bold">Kode Pembayaran</Typography>
              <Typography tag="h5" variatn="headline-small-bold">1222/Linkaja/23uu23</Typography>
            </div>
            <Button size="48" variant="primary">Saya Sudah Bayar</Button>
          </div>
        </div>
      </section>
    </Pagebase>
  );
}

export default Billing;
