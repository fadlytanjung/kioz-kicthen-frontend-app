import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ButtonCart from '../../components/elements/ButtonCart';
import Pagebase from '../../components/layouts/Pagebase/user';
import { IMAGES } from '../../configs';
import { fetchData } from '../Home/action';
import { getDetail, addToCart } from './action';
import { Button, Typography } from 'leanui-framework/components';
import { addCart, check } from '../../utils/cart';
import './styles.scss';

function Detail() {
  const dispatch = useDispatch();
  const { detail } = useSelector(s => s.detail);
  const { product } = useSelector(s => s.product);
  const { cart } = useSelector(s => s.cart);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getDetail(slug));
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    dispatch(getDetail(slug));
  }, [slug]);

  const anotherProduct = [...product.filter(el => el.id !== detail.id)];

  const clickCart = (value, id) => {
    addCart(id, value > 0 ? 'add' : 'rem', cart, dispatch, addToCart);
  };

  const price = detail.price - ((detail.price * detail.discount) / 100);

  const renderDetai = () =>{
    return(
      <React.Fragment>
        <div className="top">
          <Typography bold tag="h2" variant="heading-medium-bold">{detail.name}</Typography>
          <Typography tag="p" variant="heading-large">{detail.description}</Typography>
        </div>
        <div className="bottom">
          {detail.discount > 0 && <Typography tag="h3" variant="caption-bold"><strike><span>{detail.display_price}</span></strike></Typography>}
          <Typography tag="h2" variant="caption-bold">Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <span>/ {detail.unit}</span></Typography>
          <Typography tag="p" variant="caption">Jumlah Pembelian</Typography>
          {check(detail.id,cart) !== false ? <ButtonCart maxValue={detail.stock}
            onClick={(num) => clickCart(num, detail.id)}
            value={check(detail.id,cart).qty} /> :
            <Button onClick={() => addCart(detail.id, 'add', cart, dispatch, addToCart)} size="48" variant="primary">Beli</Button>}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Pagebase>
      <section className="container-detail">
        <div className="container-small m-b-50">
          <div className="breadcum">
            <Typography tag="h5" variant="headline-small"><Link to="/">Produk Terbaik</Link> {<img height="10px" src={IMAGES.arrow_right} width="10px" />} </Typography>
            <Typography tag="h5" variant="headline-small">{detail.name}</Typography>
          </div>
          <div className="content-detail">
            <img src={detail.image} />
            <div className="content-info">
              {renderDetai()}
            </div>
          </div>
        </div>
        <div className="container-small">
          <div className="heading-wrapper">
            <Typography tag="h3" variant="headline-medium-bold">Produk Lainnya</Typography>
          </div>
          <div className="product-wrapper">
            {anotherProduct.splice(0, 5).map((item) => {
              return (
                <div className="product-item" key={item.id}>
                  <Link to={`/product/${item.slug}`}><img src={item.image} /></Link>
                  <div className="product-desc">
                    <Link to={`/product/${item.slug}`}><Typography tag="h5" variant="headline-small-bold">{item.name}</Typography></Link>
                    <Typography tag="p" variant="caption-bold">{item.display_price} <span>/ {item.unit}</span></Typography>
                    {check(item.id, cart) !== false ? <ButtonCart maxValue={item.stock}
                      onClick={(num) => clickCart(num, item.id)}
                      value={check(item.id,cart).qty} /> :
                      <Button onClick={() => addCart(item.id, 'add', cart, dispatch, addToCart)} size="48" variant="primary">Beli</Button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Pagebase>
  );
}

export default Detail;
