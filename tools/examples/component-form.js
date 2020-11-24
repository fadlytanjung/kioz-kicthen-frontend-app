import React from 'react';
import { Field } from 'redux-form';
import TextField from '../../../components/elements/TextField';
import PropTypes from 'prop-types';

export default class Component extends React.Component {
  render() {
    const { handleSubmit, isLoading, invalid, submitting } = this.props;
    const disabled = invalid || submitting || isLoading;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="field1" component={TextField} />
        <Field name="field2" component={TextField} />
        <button type="submit" disabled={disabled}>Submit</button>
      </form>
    );
  }
}

Component.defaultProps = {
  handleSubmit: () => {},
  isLoading: false,
  invalid: false,
  submitting: false,
};

Component.propTypes = {
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};