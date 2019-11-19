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
  routes.map(item => {
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
