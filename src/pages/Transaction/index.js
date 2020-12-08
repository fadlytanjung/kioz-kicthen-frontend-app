import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertFragment from '../../components/fragments/Alert';
import Pagebase from '../../components/layouts/Pagebase/admin';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable, Popup, SearchBox, Typography } from 'leanui-framework/components';
import { fetchData } from './action';
import './styles.scss';

export default function Report(props) {
  const { messageAlert, meta: { page = 1, totalPage = 5 },
    showAlert, typeAlert } = props;

  const dispatch = useDispatch();
  const { report } = useSelector(s => s.report);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    if (showAlert && popup) {
      setPopup(false);
    }
  });

  const [openPage, setOpenPage] = useState(false);
  const [query, setQuery] = useState();
  const [size, setSize] = useState(5);
  const head = ['Id Transaksi', 'Tanggal', 'Id Pesanan', 'User', 'Total', 'Status'];
  const body = report.length > 0 ? [report] : [[]];

  const show = ['transactionId', 'date', 'orderId', 'user', 'amount', 'status'];

  const clickNav = () => {
    // actions.getListAdmins(page, 5);
  };

  const closeAlert = () => {
    // actions.closeAlert();
  };

  const closePopup = () => {
    setPopup(false);
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

  return (
    <React.Fragment>
      <Pagebase>
        {showAlert &&
          <AlertFragment message={messageAlert} onClose={closeAlert} type={typeAlert} />}
        {popup &&
          <Popup close height={818} onClose={closePopup} width={530} />}
        <section className="headline-wrapper">
          <Typography bold="true" class-name="headline" tag="label" variant="headline-large">Riwayat Transaksi</Typography>
          <Typography class-name="headline-sub" tag="label" variant="headline-small">Lihat Riwayat Transaksi Anda</Typography>
        </section>
        <section className="page-content">
          <div className="page-content-head">
            <div>
              <Typography bold="true" tag="label" variant="headline-small">Daftar Transaksi</Typography>
            </div>
            <div className="page-content-head-right">
              <SearchBox
                onChange={(e) => { setQuery(e.target.value); }}
                onKeyUp={onKeyUpQuery}
                placeholder="Cari transaksi. . ." value={query} width="413px" />
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

Report.defaultProps = {
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

Report.propTypes = {
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


