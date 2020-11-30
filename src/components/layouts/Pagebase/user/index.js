import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Pagebase(props){
  return(
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

export default Pagebase;

Pagebase.defaultProps = {
  children: null
};

Pagebase.propTypes = {
  children: PropTypes.node,
};
