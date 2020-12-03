import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Banner from '../../components/elements/Banner';
import ButtonCart from '../../components/elements/ButtonCart';
import Pagebase from '../../components/layouts/Pagebase/user';
import { fetchData, addToCart } from './action';
import { Button, Dropdown, Typography } from 'leanui-framework/components';
import { addCart, check } from '../../utils/cart';
import './styles.scss';

function Home() {
  const dispatch = useDispatch();
  const { product } = useSelector(s => s.product);
  const { cart } = useSelector(s => s.cart);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('buah');
  const [items, setItems] = useState([
    { text: 'Buah', value: 'buah', selected: true },
    { text: 'Sayur', value: 'sayur' }
  ]);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const _handleOpen = () => setOpen(!open);
  const _handleClick = (item) => {
    setValue(item);
    setItems([...items.map(obj => {
      return obj.value === item ? { ...obj, selected: true } : { ...obj, selected: false };
    })]);
    setOpen(false);
  };

  const clickCart = (value, id) => {
    addCart(id, value > 0 ? 'add' : 'rem', cart, dispatch, addToCart);
  };
  return (
    <Pagebase>
      <section className="container-main">
        <div className="container-small">
          <Banner />
          <div className="heading-wrapper">
            <Typography tag="h3" variant="headline-medium-bold">Produk Terbaik</Typography>
            <Dropdown
              handleClick={_handleClick.bind(this)}
              handleOpen={_handleOpen.bind()}
              item={items} open={open}
              value={value}
              variant="outline"
              width={188} />
          </div>
          <div className="product-wrapper">
            {product.map((item) => {
              const price = item.price - ((item.price * item.discount) / 100);
              return (
                <div className="product-item" key={item.id}>
                  <Link to={`/product/${item.slug}`}><img src={item.image} /></Link>
                  <div className="product-desc">
                    <Link to={`/product/${item.slug}`}><Typography tag="h5" variant="headline-small-bold">{item.name}</Typography></Link>
                    {item.discount > 0 && <Typography tag="h3" variant="caption-bold"><strike><span>{item.display_price}</span></strike></Typography>}
                    <Typography tag="p" variant="caption-bold">Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <span>/ {item.unit}</span></Typography>
                    {check(item.id, cart) !== false ? <ButtonCart maxValue={item.stock}
                      onClick={(num) => clickCart(num, item.id)}
                      value={check(item.id, cart).qty} /> :
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

export default Home;
