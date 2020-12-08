import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertFragment from '../../components/fragments/Alert';
import Pagebase from '../../components/layouts/Pagebase/admin';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DataTable, Dropdown, Popup, Textfield, Typography } from 'leanui-framework/components';
import Chart from '../../components/elements/Chart';
import { fetchData } from './action';
import './styles.scss';

export default function Report(props) {
  const { messageAlert, meta: { page = 1 },
    showAlert, typeAlert } = props;

  const dispatch = useDispatch();
  const { prediction } = useSelector(s => s.prediction);
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState('');
  const [showPredict, setShowpredict] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    if (showAlert && popup) {
      setPopup(false);
    }
  });

  const [openPage, setOpenPage] = useState(false);
  const [size, setSize] = useState(5);
  const head = ['Tanggal', 'Prediksi'];
  const body = prediction.length > 0 ? [prediction] : [[]];

  const show = ['date', 'prediction'];

  const clickNav = () => {
    // actions.getListAdmins(page, 5);
  };

  const closeAlert = () => {
    // actions.closeAlert();
  };

  const closePopup = () => {
    setPopup(false);
  };


  const selectPerPage = (size) => {
    setSize(size);
    setOpenPage(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const predict = () => {
    if (Number(value) > 14) {
      setPopup(true);
    } else {
      setShowpredict(true);
    }
  };
  const [level, setLevel] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [item, setItem] = useState(
    [
      {
        text: 'Mangga',
        value: 0,
        selected: level === 'Mangga',
      },
      {
        text: 'Anggur',
        value: 1,
        selected: level === 'Anggur',
      }
    ]
  );

  const handleChangeLevel = (level) => {
    setLevel(level);
    setOpenLevel(false);
    setItem([...item.map(obj => {
      return obj.value === level ? { ...obj, selected: true } : { ...obj, selected: false };
    })]);
  };

  const getLevel = (level) => {
    switch (level) {
      case 0:
        return 'Mangga Manis';
      case 1:
        return 'Anggur Merah';
      default:
        return 'Select All';
    }
  };

  const selectUnit = () => (
    <React.Fragment>
      <Dropdown
        class-name="form-field-select"
        handleClick={handleChangeLevel}
        handleOpen={() => { setOpenLevel(!openLevel); }}
        item={item}
        label="Produk"
        open={openLevel}
        value={getLevel(level)}
        variant="outline"
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Pagebase>
        {showAlert &&
          <AlertFragment message={messageAlert} onClose={closeAlert} type={typeAlert} />}
        {popup &&
          <Popup close height={218} onClose={closePopup} width={230}>
            <Typography tag="h5" variant="headline-medium" >Hanya bisa memprediksi maksimal 14 hari kedepan</Typography>
          </Popup>}
        <section className="headline-wrapper">
          <Typography bold="true" class-name="headline" tag="label" variant="headline-large">Prediksi Penjualan Produk</Typography>
          <Typography class-name="headline-sub" tag="label" variant="headline-small">Prediksi Penjualan Produk Anda</Typography>
          <div className="date-report">
            {selectUnit()}
            <Textfield
              disabled={false}
              onChange={handleChange}
              placeholder="Masukkan Jumlah Hari"
              shadow={false}
              type="number"
              width={212}
            />
            <Button
              disable={(value === '' || value === null) || level === false}
              loading={false}
              onClick={predict}
              size="48"
              variant="primary"
            >Prediksi</Button>
          </div>
        </section>
        {showPredict &&
          <React.Fragment>
            <section className="prediction-chart">
              <Chart
                data={[
                  {
                    date: '09-12-2020',
                    prediction: 24,
                  },
                  {
                    date: '10-12-2020',
                    prediction: 26,
                  },
                  {
                    date: '11-12-2020',
                    prediction: 24,
                  },
                  {
                    date: '12-12-2020',
                    prediction: 39,
                  },
                  {
                    date: '13-12-2020',
                    prediction: 27,
                  }
                ]}
                height={300}
                labelY={[0, 10, 20, 30, 40]}
                subtitle=""
                title=""
                type="line"
                width={400}
                xKey="date"
                yKey="prediction"
              />
            </section>
            <section className="page-content">
              <div className="page-content-head">
                <div>
                  <Typography bold="true" tag="label" variant="headline-small">Hasil Prediksi</Typography>
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
                  totalPage={1}
                  valuePerPage={size} />
              </div>
            </section>
          </React.Fragment>}
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


