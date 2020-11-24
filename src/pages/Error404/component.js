import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { ROUTES } from '../../configs';

export default class Component extends React.Component {
  render() {
    return (
      <section>
        <Typography variant="display2">Page not found</Typography>
        <Typography>
          <Link to={ROUTES.OFFERING()}>Back to home</Link>
        </Typography>
      </section>
    );
  }
}
