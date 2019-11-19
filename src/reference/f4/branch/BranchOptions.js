import { doGet } from '../../../utils/apiActions';

export function fetchBranchOptions(bukrs, businessArea) {
  let url = `reference/branches/`;
  if (businessArea === 'marketing') {
    url = `${url}marketing/`;
  } else if (businessArea === 'service') {
    url = `${url}service/`;
  }

  return doGet(url + bukrs)
    .then(({ data }) => {
      const newBranchOptions = data.map(item => ({
        key: item.branch_id,
        text: item.text45,
        value: item.branch_id,
      }));

      return newBranchOptions;
    })
    .catch(err => console.log(err));
}
