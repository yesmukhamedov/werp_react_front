import axios from 'axios';
export const person = info => ({ type: 'ADDINFO', payload: { info } });
export const infos = () => {
  let g = axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data);
  console.log(g);
  return {
    type: 'PERSONS',
    payload: {
      g,
    },
  };
};

// export const FETCH_DATA_EXAMPLE = 'FETCH_DATA_EXAMPLE';
// export const FETCH_DYNOBJ_HR = 'FETCH_DYNOBJ_HR';

// export function fetchDynObjHr(url, params) {
//     return function(dispatch) {
//       doGet(url, { ...params })
//         .then(({ data }) => {
//           dispatch(modifyLoader(false));
//           dispatch({
//             type: FETCH_DYNOBJ_HR,
//             data,
//           });
//         })
//         .catch(error => {
//           handleError(error, dispatch);
//         });
//     };
//   }

//   export function fetchDynObjSmsetpp()
