/* eslint-disable no-unused-vars*/
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Textfield } from 'leanui-framework/components';
import './styles.scss';

export default function Datepicker(props) {

  const { handleShow, show, title, value, onChange } = props;

  let today = new Date();
  const [activeLayer, setActiveLayer] = useState('date');
  const [actualDate, setActualDate] = useState(today.getDate());
  const [actualMonth, setActualMonth] = useState(today.getMonth());
  const [actualYear, setActualYear] = useState(today.getFullYear());
  const [currentDate, setCurrentDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());


  const usToggleOnFocus = (initialState = false) => {
    const [show, toggle] = useState(initialState);
    const eventHandlers = useMemo(() => ({
      onFocus: () => { handleShow(true); toggle(true); },
      onBlur: () => { handleShow(false); toggle(false); },
    }), []);

    return [show, eventHandlers];
  };

  const _handlerClickLayer = (layer) => {
    setActiveLayer(layer);
  };

  const _handlerClickNavigator = (action) => {
    if (activeLayer === 'date') {
      if (action === 'before') {
        if (currentMonth > 0) {
          setCurrentMonth(currentMonth - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
          setCurrentYear(currentYear - 1);
        }
      } else {
        if (currentMonth < 11) {
          setCurrentMonth(currentMonth + 1);
        } else {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        }
      }
    } else {
      if (action === 'before') {
        setCurrentYear(currentYear - 12);
      } else {
        setCurrentYear(currentYear + 12);
      }
    }
  };

  const _handlerClickValue = (date) => {

    setActualDate(date);
    setActualMonth(currentMonth);
    setActualYear(currentYear);
    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);
    setCurrentDate(date);
    let value = `${_pad(date)} / ${_pad(currentMonth
      + 1)} / ${currentYear}`;
    // setValue(value);
    onChange(value);
    handleShow(!show);
  };

  const _pad = (d) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
  };

  const _handlerSetMonth = (month) => {
    setCurrentMonth(month);
    setActiveLayer('date');
  };

  const _handlerSetYear = (year) => {
    setCurrentYear(year);
    setActiveLayer('date');
  };

  const state = {
    activeLayer: activeLayer,
    actualDate: actualDate,
    actualMonth: actualMonth,
    actualYear: actualYear,
    currentDate: currentDate,
    currentMonth: currentMonth,
    currentYear: currentYear,
  };
  const [_, eventHandlers] = usToggleOnFocus();
  return (
    <React.Fragment>
      <div className="wapper-date">
        <Textfield
          onChange={onChange}
          {...eventHandlers}
          placeholder="DD/MM/YYYY"
          shadow={false}
          title={title}
          type="text"
          value={value}
          width={212} />
        {show &&
          <Calendar {...state}
            clickLayer={_handlerClickLayer}
            clickNavigator={_handlerClickNavigator}
            clickValue={_handlerClickValue}
            setMonth={_handlerSetMonth}
            setYear={_handlerSetYear} />}
      </div>
    </React.Fragment>
  );
}

Datepicker.defaultProps = {
  handleShow: ()=>{},
  onChange: ()=>{},
  show: false,
  title: '',
  value: 'DD/MM/YYYY',
};

Datepicker.propTypes = {
  handleShow: PropTypes.func,
  onChange: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};
