import React from 'react';
import { IMAGES } from '../../../configs';
import './styles.scss';

function Banner() {
  return (
    <div className="banner-wrapper">
      <img src={IMAGES.banner1} />
      <img src={IMAGES.banner2} />
      <img src={IMAGES.banner3} />
    </div>
  );
}

export default Banner;
