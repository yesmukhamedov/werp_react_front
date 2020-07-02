import { doPostExcel } from '../utils/apiActions';
import _ from 'lodash';
import moment from 'moment';

export function resetLocalStorage() {
  localStorage.removeItem('currentPathName');
  localStorage.removeItem('breadcrumb');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
}

/**
 * Gathers the breadcrumb starting the traversion from
 * the leaf node up to the root node. As a result, an array
 * of translation objects is returned. The very first item
 * in the array represents the root element for the current node.
 * @param node - leaf node
 * @returns {Array.<*>} - array of translation objects
 */
export function calcBreadcrumb(node) {
  const menuItemNames = [];
  for (let n = node; n; n = n.parent) {
    menuItemNames.push(n.translations);
  }
  return menuItemNames.reverse();
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

export function formatTimestamptToDate(v) {
  if (!v || v.length === 0) {
    return '';
  }
  return moment.utc(v).format('DD.MM.YYYY');
}

export function formatDate(timeStr, form) {
  if (!timeStr || timeStr.length === 0) {
    return '';
  }
  return moment(timeStr)
    .local()
    .format(form);
}

export function formatDMYMS(timeStr) {
  return formatDate(timeStr, 'DD.MM.YYYY HH:mm');
}

export function formatDMY(timeStr) {
  return formatDate(timeStr, 'DD.MM.YYYY');
}

export function extractByParams(obj, param) {
  const extracted = _.map(param, p => obj[p]);
  return extracted.join(' ');
}

export function constructFullName(obj) {
  return extractByParams(obj, ['lastName', 'firstName', 'patronymic']);
}

export function handleFocus(event) {
  event.target.select();
}

export function moneyFormat(value) {
  if (!value) return '0';

  const strValue = value.toString();
  let newValue = '';
  if (strValue.length > 0) {
    const arr = strValue.split('.');
    let integerNumber = '';
    if (arr[0] !== null && arr[0] !== undefined) {
      integerNumber = arr[0];
      const { length } = integerNumber;
      let count = 0;

      for (let i = 1; i <= length; i++) {
        count++;
        if (count === 3) {
          newValue = ` ${integerNumber[length - i]}${newValue}`;
          count = 0;
        } else {
          newValue = integerNumber[length - i] + newValue;
        }
      }
      if (newValue.charAt[0] !== null && newValue.charCodeAt(0) === 32) {
        newValue = newValue.substr(1);
      }
    }
    if (arr[1] !== null && arr[1] !== undefined) {
      newValue = `${newValue}.${arr[1]}`;
    }
  }
  return newValue;
}

export function moneyInputHanler(value, decimal) {
  // replace all non-numeric characters but "."
  value = value.replace(/\s+/g, '');

  // if empty put 0
  if (value === '' || value === '0' || value === '00' || value === '000') {
    value = '0';
    return value;
  }

  if (value.charAt(value.length - 1) === '.') {
    if (decimal === 0) return value.slice(0, -1);
    return value;
  }
  // remove leading zeros
  if (!value.startsWith('0.')) {
    value = value.replace(/^0+/, '');
  }

  // value = new Number(parseFloat(value)).toFixed(2);// parseFloat(value);
  if (decimal === 1) {
    const dec1 = /^\$?[0-9]+(\.[0-9])?$/; // ^[0-9\b]+$/;
    if (value === '' || dec1.test(value)) {
      return value;
    } else return value.slice(0, -1);
  } else if (decimal === 2) {
    const dec1 = /^\$?[0-9]+(\.[0-9])?$/; // ^[0-9\b]+$/;
    const dec2 = /^\$?[0-9]+(\.[0-9][0-9])?$/; // ^[0-9\b]+$/;

    if (value === '' || dec1.test(value) || dec2.test(value)) {
      return value;
    } else return value.slice(0, -1);
  } else if (decimal === 3) {
    const dec1 = /^\$?[0-9]+(\.[0-9])?$/; // ^[0-9\b]+$/;
    const dec2 = /^\$?[0-9]+(\.[0-9][0-9])?$/; // ^[0-9\b]+$/;
    const dec3 = /^\$?[0-9]+(\.[0-9][0-9][0-9])?$/; // ^[0-9\b]+$/;
    if (
      value === '' ||
      dec1.test(value) ||
      dec2.test(value) ||
      dec3.test(value)
    ) {
      return value;
    } else return value.slice(0, -1);

    // if (value === '') {
    //   return value;
    // } else if (dec1.test(value) && dec2.test(value)) {
    //   return value;
    // }else if (dec1.test(value)) {
    //   return parseFloat(value).toFixed(1);
    // } else if (dec2.test(value)) {
    //   return parseFloat(value).toFixed(2);
    // } else return value.slice(0, -1);
  } else {
    const dec1 = /^\d+$/;
    if (value === '' || dec1.test(value)) {
      return value;
    }
  }
  return undefined;
}

export function isEmpty(obj) {
  const { hasOwnProperty } = Object.prototype;
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}
export function checkNestedObject(obj, key) {
  return key
    .split('.')
    .reduce((o, x) => (typeof o === 'undefined' || o === null ? o : o[x]), obj);
}

export function monthsArrayToOptions(months) {
  const out = [];
  for (const k in months) {
    out.push({
      key: parseInt(k, 10) + 1,
      text: months[k],
      value: parseInt(k, 10) + 1,
    });
  }

  return out;
}

export function stringYYYYMMDDToMoment(stringVal) {
  return stringVal ? moment(stringVal, 'YYYY-MM-DD') : '';
}

export function momentToStringYYYYMMDD(momentVal) {
  return momentVal ? momentVal.format('YYYY-MM-DD') : '';
}
export function momentToStringYYYYMMDDHHMMSS(momentVal) {
  return momentVal ? momentVal.format('YYYY-MM-DD HH:mm:ss') : '';
}

export function stringYYYYMMDDHHMMSSToMoment(stringVal) {
  return stringVal ? moment(stringVal, 'YYYY-MM-DD HH:mm:ss') : moment();
}

export function stringToMoment(stringVal, format) {
  return stringVal ? moment(stringVal, format) : '';
}
export function momentToString(momentVal, format) {
  return momentVal ? momentVal.format(format) : '';
}

export function excelDownload(
  a_url,
  filename,
  outputTableName,
  outputTable,
  excelHeaders,
) {
  // console.log(a_url, filename, outputTable, excelHeaders);
  return doPostExcel(a_url, {
    [outputTableName]: outputTable,
    excelHeaders,
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });

  // .post(
  //   url,
  //   {
  //     [outputTableName]: outputTable,
  //     excelHeaders,
  //   },
  //   {
  //     headers: {
  //       authorization: localStorage.getItem('token'),
  //     },
  //     responseType: 'blob',
  //   },
  // )
}

export function errorTableText(id) {
  // get errors in localStorage
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  // get language in localStorage
  const language = localStorage.getItem('language');
  // find error in errorTable by id
  const findError = errorTable.find(({ errorId }) => errorId === id);
  // text which save error text
  let errorText = '';
  // put the errors to errorText by language
  if (language === 'ru') {
    errorText = findError.textRu;
  }
  if (language === 'en') {
    errorText = findError.textEn;
  }
  if (language === 'tr') {
    errorText = findError.textTr;
  }

  return errorText;
}
