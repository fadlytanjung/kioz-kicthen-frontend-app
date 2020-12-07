import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertFragment from '../../components/fragments/Alert';
import Form from '../../components/forms/User';
import Pagebase from '../../components/layouts/Pagebase/admin';
import { useDispatch, useSelector } from 'react-redux';
import { Alert,Button, DataTable, Popup, SearchBox, Typography } from 'leanui-framework/components';
import { checkExist } from '../../utils/validation';
import { fetchData } from './action';
import { addUser } from '../../components/forms/Register/action';
import { highValue } from '../../utils/cart';
import { reset } from 'redux-form';
import './styles.scss';

export let action = null;

export default function User(props) {
  const { messageAlert, meta: { page = 1, totalPage = 5 },
    showAlert, typeAlert } = props;

  const dispatch = useDispatch();
  const { user } = useSelector(s => s.user);
  const { detail } = useSelector(s => s.detail);
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState({});
  useEffect(() => {
    if (showAlert && popup) {
      setPopup(false);
    }
  });

  const [openPage, setOpenPage] = useState(false);
  const [query, setQuery] = useState();
  const [size, setSize] = useState(5);
  const head = ['Id', 'Nama Lengkap', 'Email', 'No Hp', 'Alamat', 'Role', 'Aksi'];
  const body = user.length > 0 ? [user] : [[]];

  const show = ['id','fullname', 'email', 'phone', 'address', 'role', 'action'];

  const buttonAdd = () => {
    return (
      <div className="button-search" onClick={() => { setPopup(true); dispatch(fetchData()) }}>
        <Button
          disable={false}
          loading={false}
          size="50"
          variant="primary"
        >Tambah User</Button>
      </div>
    );
  };

  const clickEdit = (adminItem) => {
    setPopupEdit(true);
    dispatch(fetchData(adminItem.id));
  };

  const clickNav = (page) => {
    // actions.getListAdmins(page, 5);
  };

  const closeAlert = () => {
    actions.closeAlert();
  };

  const closePopup = () => {
    setPopup(false);
    setPopupEdit(false);
  };

  const onKeyUpQuery = (e) => {
    if (e.key === 'Enter' && query) {
      // actions.resetList();
      // actions.getListAdmins(1, 5, query);
    }
  };

  const resetQuery = () => {
    setQuery('');
    // actions.resetList();
    // actions.getListAdmins(1, 5);
  };

  const selectPerPage = (size) => {
    setSize(size);
    setOpenPage(false);
  };

  const submit = (value) => {
    const { email, fullname, password, phone, address, role } = value;

    if (checkExist(email) && checkExist(phone) && checkExist(password)
      && checkExist(address) && checkExist(role)
      && checkExist(fullname)) {
        dispatch(addUser({ ...value, role: 'user', id: user.length > 0 ? highValue(user).id + 1 : 1 }));
        setAlert(true);
        setMessage({ message: 'Berhasil Menambah User', type: 'success' });
        dispatch(reset('register'));
      }
  };

  action = (adminItem) => {
    return (
      <div className="action-wrapper">
        <Button onClick={clickEdit.bind(null, adminItem)}
          size="32" variant="secondary" width="84px">
          <Typography class-name="action-button" tag="label" variant="button">Edit</Typography>
        </Button>
        {adminItem.email !== 'kiozadmin@kiozkitchen.id' &&
        <Button
          size="32" variant="secondary" width="84px">
          <Typography class-name="action-button red" tag="label" variant="button">Delete</Typography>
        </Button>}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Pagebase>
        {showAlert && <AlertFragment message={messageAlert} onClose={closeAlert} type={typeAlert} />}
        {((popup) || (popupEdit && user)) &&
          <Popup close height={868} onClose={closePopup} width={530}>
            {alert && <Alert
              width={100}
              {...message}
            />}
            <Form onCancel={closePopup} onSubmit={submit} /></Popup>}
        <section className="headline-wrapper">
          <Typography bold="true" class-name="headline" tag="label" variant="headline-large">User</Typography>
          <Typography class-name="headline-sub" tag="label" variant="headline-small">Atur semua data user disini</Typography>
        </section>
        <section className="page-content">
          <div className="page-content-head">
            <div>
              <Typography bold="true" tag="label" variant="headline-small">Daftar User</Typography>
            </div>
            <div className="page-content-head-right">
              <SearchBox
                onChange={(e) => { setQuery(e.target.value); }}
                onKeyUp={onKeyUpQuery}
                placeholder="Cari nama user. . ." value={query} width="413px" />
              <Typography bold="true" class-name="label-reset"
                onClick={resetQuery} variant="body">Reset</Typography>
              {
                buttonAdd()
              }
            </div>
          </div>
          <div className="table-wrapper">
            <DataTable currentPage={page}
              data-body={body} data-head={head}
              onClickNav={clickNav}
              onClickPerPage={() => { setOpenPage(!openPage); }}
              onCLickSelectPerPage={selectPerPage}
              openPerPage={openPage}
              show={show} showPerPage={false} showToPage={false}
              totalPage={totalPage}
              valuePerPage={size} />
          </div>
        </section>
      </Pagebase>
    </React.Fragment>
  );
}

User.defaultProps = {
  actions: {},
  admin: {},
  classes: {},
  data: [],
  isLoading: false,
  messageAlert: false,
  meta: {},
  showAlert: false,
  typeAlert: false,
};

User.propTypes = {
  actions: PropTypes.object,
  admin: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  messageAlert: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  meta: PropTypes.object,
  showAlert: PropTypes.bool,
  typeAlert: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
};


