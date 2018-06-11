import _ from 'lodash';
import moment from 'moment';

export function resetLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('lang');
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
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

export function formatTimestamptToDate(v) {
  if (!v || v.length === 0) {
    return '';
  }
  return (
    moment.utc(v).format('DD.MM.YYYY')
  );
}

export function formatDate(timeStr, form) {
  if (!timeStr || timeStr.length === 0) {
    return '';
  }
  return moment(timeStr).local().format(form);
}

export function formatDMYMS(timeStr) {
  return formatDate(timeStr, 'DD.MM.YYYY HH:mm');
}

export function formatDMY(timeStr) {
  return formatDate(timeStr, 'DD.MM.YYYY');
}

export function extractByParams(obj, param) {
  const extracted = param.map(p => obj[p]);
  return extracted.join(' ');
}

export function constructFullName(obj) {
  return extractByParams(obj, ['lastName', 'firstName', 'patronymic']);
}


export function handleFocus(event) {
  event.target.select();
}

export function moneyFormat(value){
  let strValue = value.toString();
  let newValue = '';
  if (strValue.length>0){
      let arr = strValue.split(".");
      let integerNumber = '';
      if(arr[0]!==null && arr[0]!==undefined){                
          integerNumber = arr[0];
          let length = integerNumber.length;
          let count = 0;

          for (let i = 1; i<=length;i++){
              count++;
              if (count===3){
                  newValue =  " "+integerNumber[length-i] + newValue;
                  count = 0;
              }
              else
              {                        
                  newValue =  integerNumber[length-i] + newValue;
              }
          }
          if (newValue.charAt[0]!==null && newValue.charCodeAt(0)==32)
          {
              newValue = newValue.substr(1);
          }
      }
      if (arr[1]!==null && arr[1]!==undefined){
          newValue = newValue+"."+arr[1];
      }
      
  }
  return newValue;
}