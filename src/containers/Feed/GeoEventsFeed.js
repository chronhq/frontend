import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export const GeoEvent = ({ fact }) => (
  <div className='factTest'>
    <div>
      {fact.description}
    </div>
    <div>
      <h5 className='factDate'>
        {fact.date}
      </h5>
    </div>
  </div>
);


@inject('store')
@observer
export default class GeoEventsFeed extends React.Component {
  @computed get selected() {
    return this.props.store.feed.geoEvents;
  }

  @computed get current() {
    return this.props.store.prepared.geoEventsList.current;
  }

  @computed get geoEvents() {
    return this.props.store.prepared.geoEvents;
  }

  @action select(v) {
    this.props.store.feed.geoEvents[v] = !this.selected[v];
  }

  @action selectLocation(gev) {
    this.props.store.clickInfo.selectGeoEvent(gev);
  }

  @action closeWidget() {
    return this.props.store.clickInfo.closeWidget();
  }

  render() {
    return (
      <div className='geoEventsFeed'>
        {this.current.map(gevId => (
          <div
            key={`div_inv_${gevId}`}
            onMouseEnter={() => this.selectLocation(gevId)}
            onMouseLeave={() => this.closeWidget(null)}
            onClick={() => { this.select(gevId); return false; }}
            className={this.selected[gevId] === true
              ? 'selectedFact' : 'regularFact'}
          >
            <GeoEvent fact={this.geoEvents[gevId].data} />
          </div>))}
      </div>
    );
  }
}
