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
        text: 'kg',
        value: 0,
        selected: formValues ? formValues.unit === 'kg' : false,
      },
      {
        text: 'gr',
        value: 1,
        selected: formValues ? formValues.unit === 'gr' : false,
      },
      {
        text: 'pack',
        value: 2,
        selected: formValues ? formValues.unit === 'pack' : false,
      }
    ]
  );

  const handleChangeLevel = (level) => {
    setLevel(level);
    setOpenLevel(false);
    setItem([...item.map(obj => {
      return obj.value === level ? { ...obj, selected: true } : { ...obj, selected: false };
    })])
    dispatch(change('product', 'unit', getLevel(level)));
  };

  const getLevel = (level) => {
    switch (level) {
      case 0:
        return 'kg';
      case 1:
        return 'gr';
      case 2:
        return 'pack';
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
        label="Satuan"
        open={openLevel}
        value={formValues ? formValues.unit : getLevel(level)}
        variant="outline"
      />
      <input type="hidden" {...input} />
    </React.Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography bold class-name="form-label" tag="label" variant="headline-medium">
        {formValues && formValues.id ? 'Edit Produk' : 'Tambah Produk' }
      </Typography>
      <div className="form-field">
        <Field component={renderTextfield} name="name" placeholder="Isi Nama Produk" title="Nama Produk"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="description" placeholder="Isi Deskripsi" title="Deskripsi"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="price" placeholder="Isi Harga" title="Harga" type="number"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="stock" placeholder="Isi Stok" title="Stok" type="number"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="discount" placeholder="Isi Diskon" title="Discount" type="number"
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
