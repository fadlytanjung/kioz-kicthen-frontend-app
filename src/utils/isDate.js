import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

/*eslint-disable*/
const isDate = (date) =>{
  let result = /((?=\d{4})\d{4}|(?=a-zA-Z]{3})[a-zA-Z]{3}|\d{2})((?=\/)\/|\-)((?=[0-9]{2})[0-9]{2}|(?=[0-9]{1,2})[0-9]{1,2}|[a-zA-Z]{3})((?=\/)\/|\-)((?=[0-9]{4})[0-9]{4}|(?=[0-9]{2})[0-9]{2}|[a-zA-Z]{3})/;
  return result.test(date);
};

const convertDate = (date) =>{
  let split = date.split('/');
  return split[1]+'/'+split[0]+'/'+split[2];
}

const convertDateDash = (date) => {
  let split = date.split('-');
  return split[1] + '-' + split[0] + '-' + split[2];
}

const toNormalDate = (data) => {
  let date = new Date(data);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

const dateApiFormat = (data) =>{
  data = data.replace(/\s/g, '');
  const date = data.split('/');
  return date[2]+'-'+date[1]+'-'+date[0];
}

const slashDate = (date) =>{
  let temp = new Date(date);
  let m = String(temp.getMonth() + 1);
  let dd = String(temp.getDate());
  let yyyy = String(temp.getFullYear());

  let hh = String(temp.getHours());
  let mm = String(temp.getMinutes());
  let ss = String(temp.getSeconds());

  return `${dd.padStart(2, '0')}/${m.padStart(2, '0')}/${yyyy} ${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`;
}

const convertDateSlash = (data) =>{
  let date = new Date(data);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  return date != 'Invalid Date' && data !== 'YYYY-MM-DD' ? (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year : 'DD / MM / YYYY';
}

const normalizeDate = value => {
  value = value.replace(/\s/g, '');
  value = value.replace(/\//g, '-');
  value = value.split('-').reverse().join('-');
  return value;
}

const checkStatus = (start, end, isactive) => {
  const sYear = new Date(start).getFullYear();
  const eYear = new Date(end).getFullYear();
  const sMonth = new Date(start).getMonth();
  const eMonth = new Date(end).getMonth();
  const sDay = new Date(start).getDate();
  const eDay = new Date(end).getDate()
  const startDate = new Date(sYear, sMonth, sDay)
    , endDate = new Date(eYear, eMonth, eDay)
    , date = new Date()
    , range = moment().isBetween(startDate, endDate,'days','[]');
  
  const isBefore = moment(date).isBefore(start);
  const isAfter = moment(date).isAfter(end);

  let status = 1;

  if(!isactive){
    status = 1;
  } else if (range){
    status = 3;
  } else if (!range && isBefore){
    status = 2;
  } else if (!range && isAfter){
    status = 4;
  }

  return status;
}

export {
  isDate,
  checkStatus,
  convertDate,
  convertDateDash,
  convertDateSlash,
  dateApiFormat,
  normalizeDate,
  slashDate,
  toNormalDate,
}
