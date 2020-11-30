const actions = {
  ADD_CART: `ADD_CART`,
  FETCH_PRODUCT: 'FETCH_PRODUCT',
  SHOW_MODAL: (type) => `SHOW_MODAL_${type}`,
  HIDE_MODAL: (type) => `HIDE_MODAL_${type}`,
};

export default actions;