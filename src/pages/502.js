import React from 'react';

import ErrorPage from '../templates/ErrorPage/ErrorPage';

const BadGateway = () => (
  <ErrorPage code={502} />
);

export default BadGateway;
