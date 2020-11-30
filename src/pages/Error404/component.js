import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../configs';

export default class Component extends React.Component {
  render() {
    return (
      <section>
        <h1>Page not found</h1>
        <Link to={ROUTES.OFFERING()}>Back to home</Link>
      </section>
    );
  }
}
