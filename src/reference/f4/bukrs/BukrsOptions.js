import { doGet } from '../../../utils/apiActions';

export function fetchBukrsOptions() {
    return doGet(`core/reference/companies`)
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
