import moment from 'moment'

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

export function formatTimestamptToDate (v) {
    if (!v || v.length === 0) {
        return ''
    }
    return (
        moment.utc(v).format('DD.MM.YYYY')
    )
}