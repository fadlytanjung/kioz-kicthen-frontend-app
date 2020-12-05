import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IMAGES } from '../../../../configs';
import './styles.scss';

function Pagebase(props) {
  const history = useHistory();
  const back = () => history.goBack();
  return (
    <React.Fragment>
      <div className="header-payment">
        <div className="container-small">
          <img onClick={back} src={IMAGES.arrowLeft} />
          <img src={IMAGES.logoWhite} />
        </div>
      </div>
      {props.children}
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
