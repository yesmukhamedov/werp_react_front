import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//
import {
  getDmsplist,
  f4FetchBranches,
  f4ClearAnyObject,
} from '../../marketingAction';

import { injectIntl } from 'react-intl';

function Dmsplist(props) {
  const [count, setCount] = useState(0);

  //componentDidMount
  useEffect(() => {
    props.getDmsplist();
    //unmount
    return () => {};
  }, []);
  console.log('effect', count);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default connect(
  '',
  { getDmsplist },
)(injectIntl(Dmsplist));
