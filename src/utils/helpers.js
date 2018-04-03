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

export function formatDateTime(timeStr) {
  return formatDate(timeStr, 'DD.MM.YYYY HH:mm');
}
