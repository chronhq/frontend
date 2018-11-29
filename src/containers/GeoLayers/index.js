import React, { Suspense, lazy } from 'react';

import Spinner from '../../components/Spinner/Spinner';

const MapWrapper = lazy(() => import('./MapWrapper'));

const GeoLayers = () => (
  <Suspense fallback={<Spinner />}>
    <MapWrapper />
  </Suspense>
);

export default GeoLayers;
