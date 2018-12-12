import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';

export function fetchBranchOptions(bukrs, businessArea) {
  let url = `${ROOT_URL}/api/reference/branches/`;
  if (businessArea === 'marketing') {
    url = `${url}marketing/`;
  } else if (businessArea === 'service') {
    url = `${url}service/`;
  }

  return axios
    .get(url + bukrs, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
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
