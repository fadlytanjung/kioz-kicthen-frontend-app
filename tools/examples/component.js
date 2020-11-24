import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Component extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.root}>
        {children}
      </div>
    );
  }
}

Component.defaultProps = {
  children: null,
};

Component.propTypes = {
  children: PropTypes.node,
};