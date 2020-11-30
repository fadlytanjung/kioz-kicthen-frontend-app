import React from 'react';
import PropTypes from 'prop-types';

function Button(props){
  const { children } = props;
  return(
    <button {...props}>{children}</button>
  );
}

export default Button;

Button.defaultProps = {
  children: null,
};

Button.propTypes = {
  children: PropTypes.node,
};
