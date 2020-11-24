import PropTypes from 'prop-types';

export function capitalize(string) {
  if (typeof string !== 'string') {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const tagPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
  PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
  ]))
]);


export function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity / 100})`;
}

export function sumVal(arr, val){
  return arr.map(item => item[val]).reduce((prev, next) => prev + next);
}

export function dateFormat(date){
  return `${date.getDate()}`.padStart(2, '0') +
    ` / ` + `${date.getMonth() + 1}`.padStart(2, '0') +
    ` / ` + `${date.getFullYear()}`;
}

export function filterQuery(contents=[], key, keyword) {
  return contents.filter((el) => {
    if (el[`${key}`]) {
      return el[`${key}`].toLowerCase().includes(keyword.toLowerCase());
    }
  });
}

export function checkFilter(query){
  let split = query !== undefined ? query.split('?') : [''];
  split = split[split.length > 1  ? 1: 0].split('&');
  let result = split.length > 2 ? split.slice(2,split.length).join('&') : '';
  return result;
}


export function queryFilter(data, query){
  let split = query!== undefined ? query.split('&') : [''];
  let mapData = {};
  let result;
  let keyword;
  let resultKeyword;
  for (let i = 0; i < split.length; i++) {
    mapData[split[i].split('=')[0]] = split[i].split('=')[1];
  }
  result = 'filter' in mapData && mapData.filter !== 'null' ?
    data.filter(e => dateFormat(new Date(e.createdAt)) === mapData.filter) : data;
  keyword = 'keyword' in mapData && mapData.keyword !== '' ? mapData.keyword : '';
  let username = filterQuery(result, 'username', keyword);
  let email = filterQuery(result, 'email', keyword);
  let description = filterQuery(result, 'transactionName', keyword);

  if (username.length > 0) {
    resultKeyword = username;
  } else if (email.length > 0) {
    resultKeyword = email;
  } else {
    resultKeyword = description;
  }
  result = keyword !== '' ? resultKeyword : result;

  return result;
}
