/*eslint-disable no-unused-vars, react/jsx-max-depth*/
import React from 'react';
import Pagebase from '../../components/layouts/Pagebase/payment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, Textfield, Typography } from 'leanui-framework/components';
import { IMAGES, ROUTES } from '../../configs';
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
                <div className="detail">
                  <img src={IMAGES.check} />
                  <div className="detail-static">
                    <Typography tag="h4" variant="headline-small-bold">Nomor Telepon</Typography>
                    <Typography tag="h5" variant="headline-small-bold">08111996557</Typography>
                    <div className="change">
                      <Typography tag="h5" variant="headline-small-bold">Ubah Nomor</Typography>
                    </div>
                    <Typography tag="h6" variant="headline-small-bold">Kami butuh nomor anda agar dapat mengabarin jika barang habis</Typography>
                  </div>
                </div>
              </div>
              <div className="card-payment">
                <div className="detail">
                  <img src={IMAGES.check} />
                  <div className="detail-static">
                    <Typography tag="h4" variant="headline-small-bold">Alamat Pengantaran</Typography>
                    <Typography tag="h5" variant="headline-small-bold">Kontak Penerima</Typography>
                    <Typography tag="h6" variant="headline-small-bold">Fadly 08111996557</Typography>
                    <Typography tag="h6" variant="headline-small-bold">Jl Mongonsidi No 6, Medan</Typography>
                    <div className="change">
                      <Typography tag="h5" variant="headline-small-bold">Ubah</Typography>
                    </div>
                    <Textfield
                      disabled={false}
                      image={IMAGES.notes}
                      input={{}}
                      placeholder="Catatan untuk kurir"
                      shadow={false}
                      type="text"
                      width={'95%'}/>
                  </div>
                </div>
              </div>
              <div className="card-payment">
                <div className="detail">
                  <img src={IMAGES.check} />
                  <div className="detail-static">
                    <Typography tag="h4" variant="headline-small-bold">Waktu Pengiriman</Typography>
                    <Dropdown item={[{ text: '11.00-13.00', value: '11.00-13.00' }, { text: '14.00-16.00', value: '14.00-16.00' } ]} value="11.00-13.00" variant="outline"/>
                  </div>
                </div>
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
                  <Link to={ROUTES.BILLING()}><Button size="48" variant="primary">Bayar</Button></Link>
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
