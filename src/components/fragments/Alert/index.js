import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'leanui-framework/components';
import './style.css';

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default function AlertFragment(props) {
  const { onClose } = props;
  const ref = useRef();
  useOutsideClick(ref, () => {
    onClose();
  });

  return (
    <section className="alert-fragment" ref={ref}>
      <Alert
        {...props}
        width={85}
      />
    </section>
  );
}

AlertFragment.defaultProps = {
  onClose: () => { },
};

AlertFragment.propTypes = {
  onClose: PropTypes.func,
};
