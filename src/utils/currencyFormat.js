const toCurrency = (num, separator=null) =>{
  return num === 0 ? 0 : String(num).replace(/\B(?=(\d{3})+(?!\d))/g, separator ? separator : ',');
};

const toNumber = (num) =>{
  return num === 0 ? 0 : Number(num.replace(/,/g,''));
};

export {
  toCurrency,
  toNumber,
};
