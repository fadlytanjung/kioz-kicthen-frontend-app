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

export default function Admin(props) {
  const { dispatch, handleSubmit, onCancel, submit } = props;
  const [level, setLevel] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState(false);

  const handleChangeLevel = (level) => {
    setLevel(level);
    setOpenLevel(false);
    dispatch(change('AdminForm', 'role', level));
  };

  const getLevel = (level) => {
    switch (level) {
      case 0:
        return 'Admin';
      case 1:
        return 'Supervisor';
      case 2:
        return 'Customer Service';
      default:
        return 'Select All';
    }
  };

  const handleChangeStatus = (status) => {
    setStatus(status);
    setOpenStatus(false);
    dispatch(change('AdminForm', 'status', status));
  };

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'Tidak Aktif';
      case 1:
        return 'Aktif';
      default:
        return 'Select All';
    }
  };

  const selectLevel = ({ input }) => (
    <React.Fragment>
      <Dropdown
        class-name="form-field-select"
        handleClick={handleChangeLevel}
        handleOpen={() => { setOpenLevel(!openLevel); }}
        item={[
          {
            text: 'Admin',
            value: 0,
          },
          {
            text: 'Supervisor',
            value: 1,
          },
          {
            text: 'Customer Service',
            value: 2,
          }
        ]}
        label="Level Akses"
        open={openLevel}
        value={getLevel(level)}
        variant="outline"
      />
      <input type="hidden" {...input} />
    </React.Fragment>
  );

  const selectStatus = ({ input }) => (
    <React.Fragment>
      <Dropdown
        class-name="form-field-select"
        handleClick={handleChangeStatus}
        handleOpen={() => { setOpenStatus(!openStatus); }}
        item={[
          {
            text: 'Aktif',
            value: 1,
          },
          {
            text: 'Tidak Aktif',
            value: 0,
          }
        ]}
        label="Status Akun"
        open={openStatus}
        value={getStatus(status)}
        variant="outline"
      />
      <input type="hidden" {...input} />
    </React.Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography bold class-name="form-label" tag="label" variant="headline-medium">
        Tambah Admin Baru
      </Typography>
      <div className="form-field">
        <Field component={renderTextfield} name="fullName" placeholder="Isi Nama Admin" title="Nama Admin"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="email" placeholder="Isi Alamat Email" title="Alamat Email"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={renderTextfield} name="phoneNumber" placeholder="Isi No. Hp" title="No. Hp"
          validate={[required]} width="inherit" />
      </div>
      <div className="form-field">
        <Field component={selectLevel} name="role" validate={[required]} />
      </div>
      <div className="form-field">
        <Field component={selectStatus} name="status" validate={[required]} />
      </div>

      <div className="form-field form-split">
        <section>
          <Field component={renderTextfield} name="password" placeholder="Isi Password"
            title="Nama Admin" type="password"
            validate={[required]} width="auto" />
        </section>
        <section>
          <Field component={renderTextfield} name="repeat" placeholder="Ulangi Password"
            title="Ulangi Password" type="password"
            validate={[required, match('password','Password tidak sesuai')]} width="auto" />
        </section>
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

Admin.defaultProps = {
  dispatch: () => { },
  handleSubmit: () => { },
  input: { },
  meta: { },
  onCancel: () => { },
  submit: () => { },
};

Admin.propTypes = {
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
