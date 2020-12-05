/*eslint-disable no-unused-vars, react/jsx-max-depth*/
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagebase from '../../components/layouts/Pagebase/payment';
import { Button, Textfield, Typography } from 'leanui-framework/components';
import { IMAGES } from '../../configs';
import './styles.scss';

function Payment() {
  const dispatch = useDispatch();
  const { product } = useSelector(s => s.product);
  const { cart } = useSelector(s => s.cart);

  return (
    <Pagebase>
      <section className="container-payment">
        <div className="container-small">
          <div className="heading-wrapper">
            <Typography tag="h3" variant="headline-medium-bold">Pembayaran</Typography>
          </div>
          <div className="row">
            <div className="left-side">
              <div className="card-payment">
                <h3>Alamat</h3>
              </div>
            </div>
            <div className="right-side">
              <div className="card-payment">
                <div className="amount">
                  <Typography tag="h4" variant="headline-small-bold">Total Belanja</Typography>
                  <Typography tag="h4" variant="headline-small-bold">Rp. 100.000</Typography>
                </div>
                <div className="amount">
                  <Typography tag="h4" variant="headline-small-bold">Biaya Layanan</Typography>
                  <Typography tag="h4" variant="headline-small-bold">Rp. 25.000</Typography>
                </div>
                <div className="amount">
                  <Typography tag="h4" variant="headline-small-bold">Biaya Kemasan</Typography>
                  <Typography tag="h4" variant="headline-small-bold">Rp. 5.000</Typography>
                </div>
                <div className="voucher">
                  <Textfield
                    disabled={false}
                    placeholder="Gunakan Kode Voucher"
                    shadow={false}
                    type="text"
                    width={'12.625rem'}
                  />
                  <Button size="48" variant="primary">Gunakan</Button>
                </div>
                <div className="amount">
                  <Typography tag="h4" variant="headline-small-bold">Total Pembayaran</Typography>
                  <Typography tag="h4" variant="headline-small-bold">Rp. 130.000</Typography>
                </div>
                <div className="payment-method">
                  <Typography tag="h4" variant="headline-small-bold">Metode Pembayaran</Typography>
                  <div className="method-container">
                    <Typography tag="h5" variant="headline-small-bold">Virtual Account</Typography>
                    <Typography tag="h6" variant="headline-small-bold">BCA {'&'} BNI</Typography>
                    <div className="button-channel-container">
                      <div className="channel">
                        <img src={IMAGES.bca} />
                      </div>
                      <div className="channel active">
                        <img src={IMAGES.bni} />
                      </div>
                    </div>
                  </div>
                  <div className="method-container">
                    <Typography tag="h5" variant="headline-small-bold">E-wallet</Typography>
                    <Typography tag="h6" variant="headline-small-bold">OVO, LinkAja, Gopay</Typography>
                    <div className="button-channel-container">
                      <div className="channel">
                        <img src={IMAGES.ovo} />
                      </div>
                      <div className="channel">
                        <img src={IMAGES.linkaja} />
                      </div>
                      <div className="channel">
                        <img src={IMAGES.gopay} />
                      </div>
                    </div>
                  </div>
                  <Button size="48" variant="primary">Bayar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Pagebase>
  );
}

export default Payment;
