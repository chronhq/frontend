import React from 'react';

const GeoEvent = ({ fact }) => (
  <div>
    {fact.description}
    <span className='factDate'>{fact.date}</span>
  </div>
);

const GeoEventsFeed = ({ geoEvents, current, selected, hoverCb, changeCb }) => (
  <div className='geoEventsFeed'>{current.map(gevId =>
    <div
      key={`div_inv_${gevId}`}
      // onMouseEnter={() => hoverCb(gevId)}
      // onMouseLeave={() => hoverCb(null)}
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