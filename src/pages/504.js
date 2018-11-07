import React from 'react';

import ErrorPage from '../templates/ErrorPage/ErrorPage';

const GatewayTimeout = () => (
  <ErrorPage code={504} />
);

export default GatewayTimeout;
