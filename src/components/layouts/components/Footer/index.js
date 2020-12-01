import React from 'react';
import { IMAGES } from '../../../../configs';
import { Typography } from 'leanui-framework/components';
import './styles.scss';

function Footer() {
  // const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const about = [{
    link: '#',
    title: 'Sejarah singkat KIOZ',
  }, {
    link: '#',
    title: 'Profil',
  }, {
    link: '#',
    title: 'Pengolahan Perdagangan',
  }, {
    link: '#',
    title: 'Penjualan Ritel',
  }];
  const terms = [
    {
      link: '#',
      title: 'Feedback',
    }, {
      link: '#',
      title: 'Pengiriman Pesanan',
    }, {
      link: '#',
      title: 'Syarat & Ketentuan Pengembalian',
    }
  ];

  return (
    <footer>
      <div className="container-small wrapper-footer">
        <div className="footer-content">
          <Typography
            tag="h3"
            variant="headline-large-bold">Tentang KIOZ</Typography>
          <React.Fragment>
            {about.map((item, id) => (<Typography key={id} tag="h5" variant="headline-small" >
              {item.title}
            </Typography>))}
          </React.Fragment>
        </div>
        <div className="footer-content">
          <Typography
            tag="h3"
            variant="headline-large-bold">Terms {'&'} Condition</Typography>
          <React.Fragment>
            {terms.map((item, id) => (<Typography key={id} tag="h5" variant="headline-small" >
              {item.title}
            </Typography>))}
          </React.Fragment>
          <div className="footer-sosmed">
            <img src={IMAGES.facebook} />
            <img src={IMAGES.instagram} />
            <img src={IMAGES.gmail} />
          </div>
        </div>
        <div className="footer-content downloadApp">
          <Typography
            tag="h3"
            variant="headline-large-bold">Download KIOZ</Typography>
          <img src={IMAGES.downloadApp} />
        </div>
      </div>
      <div className="container-small copyright">
        <Typography tag="div" variant="headline-small">All right reserved © 2020 Kioz Kitchen </Typography>
      </div>
    </footer>
  );
}

export default Footer;

