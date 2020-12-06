import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IMAGES } from '../../../../configs';
import './styles.scss';

function Pagebase(props) {
  const { back } = props;
  const history = useHistory();
  const prev = () => history.goBack();
  return (
    <React.Fragment>
      <div className="header-payment">
        <div className="container-small">
          {back && <img onClick={prev} src={IMAGES.arrowLeft} />}
          <img onClick={back==false ? ()=>history.push('/') : null }src={IMAGES.logoWhite} style={{ position:'relative' }} />
        </div>
      </div>
      {props.children}
    </React.Fragment>
  );
}

export default Pagebase;

Pagebase.defaultProps = {
  back: true,
  children: null,
};

Pagebase.propTypes = {
  back: PropTypes.bool,
  children: PropTypes.node,
};
