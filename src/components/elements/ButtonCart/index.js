import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function validate(evt) {
  let theEvent = evt || window.event;
  let key;
  // Handle paste
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  } else {
    // Handle key press
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  let regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

function ButtonCart(props) {
  const { value, maxValue, onClick } = props;
  const [values, setValue] = useState(value ? value : 0);

  useEffect(()=>{
    setValue(value);
  },[value]);

  const _click = (type) => {
    setValue(type === 'add' ? values + 1 : values - 1);
    onClick(type === 'add' ? 1 : -1);
  };

  const _handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="wrapper-button-cart">
      <button className="pull-cart" onClick={() => _click('rem')}>-</button>
      <input onChange={_handleChange} onKeyPress={validate} readOnly type="text" value={values} />
      <button className="push-cart" disabled={values === maxValue} onClick={() => _click('add')}>+</button>
    </div>
  );
}

export default ButtonCart;

ButtonCart.defaultProps = {
  maxValue: undefined,
  onClick: () => { },
  value: 0,
};

ButtonCart.propTypes = {
  maxValue:PropTypes.number,
  onClick: PropTypes.func,
  value: PropTypes.number,
};
