import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../../components/elements/Banner';
import ButtonCart from '../../components/elements/ButtonCart';
import Pagebase from '../../components/layouts/Pagebase/user';
import { fetchData, addToCart } from './action';
import { Button, Dropdown, Typography } from 'leanui-framework/components';
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

  const addCart = (id, type) => {
    const item = cart.filter(el => el.id === id);
    const tempCart = cart;
    let newData;
    if (item.length > 0) {

      if (item[0].qty + (type === 'add' ? 1 : -1) === 0) {
        newData = [...tempCart.filter(el => el.id !== id)];
      } else {

        newData = [...tempCart.map((item) => {
          return item.id === id ? { ...item, qty: item.qty + (type === 'add' ? 1 : -1) } : { ...item };
        })];
      }
      dispatch(addToCart(newData));
    } else {
      dispatch(addToCart([...tempCart, { id: id, qty: 1 }]));
    }

  };

  const check = (id) => {
    const item = cart.filter(el => el.id === id);
    if (item.length > 0) {
      return { ...item[0] };
    }
    return false;
  };

  const clickCart = (value, id) => {
    addCart(id, value > 0 ? 'add' : 'rem');
  };
  return (
    <Pagebase>
      <section className="container-main">
        <div className="container-small">
          <Banner />
          <div className="heading-wrapper">
            <Typography bold tag="h5" variant="headline-medium">Produk Terbaik</Typography>
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
              return (<div className="product-item" key={item.id}>
                <img src={item.image} />
                <div className="product-desc">
                  <Typography bold tag="h5" variant="headline-small">{item.name}</Typography>
                  <Typography bold tag="p" variant="caption-bold">{item.display_price} <span>/ {item.unit}</span></Typography>
                  {check(item.id) !== false ? <ButtonCart maxValue={item.stock}
                    onClick={(num) => clickCart(num, item.id)} value={check(item.id).qty} /> :
                    <Button onClick={() => addCart(item.id, 'add')} size="48" variant="primary">Beli</Button>}
                </div>
              </div>);
            })}
          </div>
        </div>
      </section>
    </Pagebase>
  );
}

export default Home;
