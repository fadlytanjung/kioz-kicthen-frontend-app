import React, { useState } from 'react';
import { Field, change } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Dropdown, Textfield, Typography } from 'leanui-framework/components';
import { match, required } from '../../../utils/validation';
import './style.css';

const renderTextfield = (props) => {
  const { meta: { error, touched } } = props;
  const errorMessage = error && touched && error;

  return (
    <Textfield {...props} error={errorMessage} helper={errorMessage} />
  );
};

export default function Product(props) {
  const { dispatch, handleSubmit, onCancel, submit, formValues } = props;
  const [level, setLevel] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [item, setItem] = useState(
    [
      {
        text: 'user',
        value: 0,
        selected: formValues ? formValues.role === 'user' : false,
      },
      {
        text: 'admin',
        value: 1,
        selected: formValues ? formValues.role === 'admin' : false,
      }
    ]
  );

  const handleChangeLevel = (level) => {
    setLevel(level);
    setOpenLevel(false);
    setItem([...item.map(obj => {
      return obj.value === level ? { ...obj, selected: true } : { ...obj, selected: false };
    })])
    dispatch(change('user', 'role', getLevel(level)));
  };

  const getLevel = (level) => {
    switch (level) {
      case 0:
        return 'user';
      case 1:
        return 'admin';
      default:
        return 'Select All';
    }
  };

  const selectUnit = ({ input }) => (
    <React.Fragment>
      <Dropdown
        class-name="form-field-select"
        handleClick={handleChangeLevel}
        handleOpen={() => { setOpenLevel(!openLevel); }}
        item={item}
        label="Role"
        open={openLevel}
        value={formValues ? formValues.role : getLevel(level)}
        variant="outline"
      />
      <input type="hidden" {...input} />
    </React.Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography bold class-name="form-label" tag="label" variant="headline-medium">
        {formValues && formValues.id ? 'Edit User' : 'Tambah User' }
      </Typography>
      <div className="form-field">
        <Field component={renderTextfield} name="fullname" placeholder="Isi Nama Lengkap" title="Nama Lengkap"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="email" placeholder="Isi Email" title="Email"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="phone" placeholder="Isi No Hp" title="No Hp" type="number"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="address" placeholder="Isi Alamat" title="Alamat"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="password" placeholder="Isi Passwod" title="Password" type="password"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={selectUnit} name="role" validate={[required]} />
      </div>
      <div className="form-button">
        <section>
          <Button onClick={onCancel} variant="secondary" width={130}>
            Batal
          </Button>
          <Button onClick={submit} type="submit" width={153}>
            Tambah
          </Button>
        </section>
      </div>
    </form>
  );
}

Product.defaultProps = {
  dispatch: () => { },
  handleSubmit: () => { },
  input: { },
  meta: { },
  onCancel: () => { },
  submit: () => { },
};

Product.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  input: PropTypes.object,
  meta: PropTypes.object,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
};

renderTextfield.defaultProps = {
  meta: { },
};

renderTextfield.propTypes = {
  meta: PropTypes.object,
};
