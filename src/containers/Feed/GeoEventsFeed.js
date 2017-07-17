import React from 'react';

const GeoEvent = ({ fact }) => (
  <div className='factTest'>
    <div>
      {fact.description}
    </div>
    <div>
      <h5 className='factHeader'> </h5>
      <h5 className='factDate'>{fact.date}</h5>
    </div>
  </div>
);

const GeoEventsFeed = ({ geoEvents, current, selected, hoverCb, changeCb }) => (
  <div className='geoEventsFeed'>{current.map(gevId =>
    <div
      key={`div_inv_${gevId}`}
      onMouseEnter={() => hoverCb(gevId)}
      onMouseLeave={() => hoverCb(null)}
      onClick={() => changeCb({ [gevId]: !selected[gevId] })}
      className={selected[gevId] === true
        ? 'selectedFact' : 'regularFact'}
    >
      <GeoEvent fact={geoEvents.byId[gevId]} />
    </div>
  )}
  </div>
);

export default GeoEventsFeed;
