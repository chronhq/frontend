import React from 'react';

import './DashboardSearch.less';

const DashboardSearch = () => (
  <input className='dashboard-search' type='text' onChange={() => console.log(e.target.value)} />
);

export default DashboardSearch;
