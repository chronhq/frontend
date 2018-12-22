import React from 'react';

import './DashboardSearch.less';

const DashboardSearch = () => (
  <input
    className='dashboard-search'
    type='text'
    onChange={() => console.log('search in not implemented')}
  />
);

export default DashboardSearch;
