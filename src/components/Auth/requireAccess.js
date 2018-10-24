const routes = [
  {
    url: '/service/packets/splist',
    component: 'SpList',
    transactionCode: 'SPLIST',
  },
  {
    url: '/service/packets/spnew',
    component: 'SpNew',
    transactionCode: 'SPNEW',
  },
  {
    url: '/service/packets/spview/:id',
    component: 'SpView',
    transactionCode: 'SPVIEW',
  },
];

export default store => (nextState, replace) => {
  console.log(store.getState().menu.routes);
  console.log('nextState.location.pathname', nextState.location.pathname);
  let noAccess = true;
  routes.map((item) => {
    console.log(item.url, item.component, item.transactionCode);
    if (nextState.location.pathname === item.url) {
      console.log('it is true', nextState.location.pathname, item.url);
      noAccess = false;
    }
  });
  console.log('noAccess: ', noAccess);
  if (noAccess) {
    replace({ pathname: '/noAccess' });
  }
};

// export const requireAccess1 = (nextState, replace) => {
//     console.log("nextState.location.pathname", nextState.location.pathname)

//     const promise = axios.get(`${ROOT_URL}/api/routes`, {
//         headers: {
//             authorization: localStorage.getItem('token')}
//     });
//     //replace({pathname: '/noAccess'});

//     promise.then(response => {
//         // If request is good...
//         // - check access to this route
//         console.log(response.data)
//         let noAccess = true;
//         response.data.map(item => {
//             console.log(item.url, item.component, item.transactionCode)
//             if(nextState.location.pathname === item.url) {
//                 console.log("it is true", nextState.location.pathname, item.url)
//                 noAccess = false;
//             }
//         });
//         console.log('noAccess: ', noAccess)
//         if(noAccess) {
//             console.log("replace ???")
//             replace({pathname: '/noAccess'});
//         }

//     })
//     .catch(error => {
//         // If request is bad...
//         // - Show an error to the user
//         const msg = "Can't get accessible routes. "
//         if(error.response) {
//             console.log(msg + error.response.data.message);
//         } else{
//             Promise.resolve({ error }).then(response => console.log(msg + response.error.message));
//         }
//         replace({pathname: '/noAccess'});
//     });
// }

// function haveAccess(route){
//     let returnType = false;
//     axios.get(`${ROOT_URL}/api/routes`, {
//         headers: {
//             authorization: localStorage.getItem('token')}
//     })
//     .then(response => {
//         // If request is good...
//         // - check access to this route
//         console.log(response.data)
//         response.data.map(item => {
//             console.log(item.url, item.component, item.transactionCode)
//             if(route === item.url) {
//                 console.log("it is true", route, item.url)
//                 returnType = true;
//             }
//         });
//         console.log('returnType', returnType)
//         return returnType;

//     })
//     .catch(error => {
//         // If request is bad...
//         // - Show an error to the user
//         const msg = "Can't get accessible routes"
//         if(error.response) {
//             console.log(msg + error.response.data.message);
//         } else{
//             Promise.resolve({ error }).then(response => console.log(msg + response.error.message));
//         }
//     });
// };
