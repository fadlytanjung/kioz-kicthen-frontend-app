const addCart = (id, type, cart, dispatch, addToCart) => {
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

const check = (id, cart) => {
  const item = cart.filter(el => el.id === id);
  if (item.length > 0) {
    return { ...item[0] };
  }
  return false;
};

const clickCart = (value, id, cart, dispatch, addToCart) => {
  addCart(id, value > 0 ? 'add' : 'rem', cart, dispatch, addToCart);
};

const currency = (price) =>{
  return Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const checkExist = (data, value) => {
  return data.some(function (el) {
    return el.name === value;
  });
};

const highValue = (obj) => {
  return obj.reduce((a, b) => obj[a] > obj[b] ? a : b);
};


export {
  addCart,
  check,
  checkExist,
  clickCart,
  currency,
  highValue,
};
