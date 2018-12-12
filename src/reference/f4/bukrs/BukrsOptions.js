import axios from 'axios';
import { ROOT_URL } from '../../../utils/constants';

export function fetchBukrsOptions() {
  return axios
    .get(`${ROOT_URL}/api/reference/companies`, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(({ data }) => {
      const newCompanyOptions = data.map(item => ({
        key: item.id,
        value: item.id,
        text: item.name,
      }));
      return newCompanyOptions;
    })
    .catch(err => console.log(err));
}
