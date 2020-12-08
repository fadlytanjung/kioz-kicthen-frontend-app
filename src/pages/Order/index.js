/*eslint-disable react/display-name*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertFragment from '../../components/fragments/Alert';
import Pagebase from '../../components/layouts/Pagebase/admin';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DataTable, Popup, SearchBox, Typography } from 'leanui-framework/components';
import { fetchData, updateData } from './action';
import './styles.scss';
import Textfield from 'leanui-framework/components/Textfield';

export let action = null;

export default function Order(props) {
  const { messageAlert, meta: { page = 1, totalPage = 5 },
    showAlert, typeAlert } = props;

  const dispatch = useDispatch();
  const { order } = useSelector(s => s.order);

  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [resi, setResi] = useState(null);
  const [data, setData] = useState(null);
  const [openPage, setOpenPage] = useState(false);
  const [query, setQuery] = useState();
  const [size, setSize] = useState(5);

  useEffect(() => {
    if (showAlert && popup) {
      setPopup(false);
    }
  });
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const head = ['Id Pesanan', 'Total Produk', 'Total Bayar', 'Status Pembayaran', 'Status Pesanan', 'Aksi'];
  const body = order.length > 0 ? [order] : [[]];

  const show = ['orderId', 'totalItems', 'amount', 'paymentStatus', 'orderStatus', 'action'];


  const clickNav = () => {
  };

  const closeAlert = () => {
    // actions.closeAlert();
  };

  const closePopup = () => {
    setPopup(false);
    setPopupEdit(false);
  };

  const onKeyUpQuery = (e) => {
    if (e.key === 'Enter' && query) {
      //TODO
    }
  };

  const resetQuery = () => {
    setQuery('');
  };

  const selectPerPage = (size) => {
    setSize(size);
    setOpenPage(false);
  };

  const _shipping = (data) => {
    setPopup(true);
    setData(data);
  };
  const _handleChange = (e) => {
    setResi(e.target.value);
  };

  const _updateResi = () => {
    const index = order.map((x) => x.orderId).indexOf(data.orderId);
    let newOpenLevel = [...order];
    newOpenLevel[index].orderStatus = 'shipping';
    dispatch(updateData(newOpenLevel));
    closePopup();
  };


  action = (adminItem) => {
    return (
      <div className="action-wrapper">
        <Button onClick={() => _shipping(adminItem)} size="36" variant="secondary">process</Button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Pagebase>
        {showAlert &&
          <AlertFragment message={messageAlert} onClose={closeAlert} type={typeAlert} />}
        {((popup) || (popupEdit)) &&
          <Popup close height={218} onClose={closePopup} width={530}>
            <Typography tag="h5" variant="headline-medium">Update Status</Typography>
            <div className="resi-wrapper">
              <div className="text">
                <Textfield
                  onChange={_handleChange}
                  placeholder="Masukkan No Resi"
                  shadow={false}
                  type="text"
                  width={'90%'}
                />
              </div>
              <Button disable={resi === null || resi === ''} onClick={_updateResi} size="48" variant="primary">Update</Button>
            </div>
          </Popup>}
        <section className="headline-wrapper">
          <Typography bold="true" class-name="headline" tag="label" variant="headline-large">Pesanan</Typography>
          <Typography class-name="headline-sub" tag="label" variant="headline-small">Lihat daftar pesanan disini</Typography>
        </section>
        <section className="page-content">
          <div className="page-content-head">
            <div>
              <Typography bold="true" tag="label" variant="headline-small">Daftar Pesanan</Typography>
            </div>
            <div className="page-content-head-right">
              <SearchBox
                onChange={(e) => { setQuery(e.target.value); }}
                onKeyUp={onKeyUpQuery}
                placeholder="Cari pesanan. . ." value={query} width="413px" />
              <Typography bold="true" class-name="label-reset"
                onClick={resetQuery} variant="body">Reset</Typography>
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

Order.defaultProps = {
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

Order.propTypes = {
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


