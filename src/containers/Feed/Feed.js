import React from 'react';
import { inject, observer } from 'mobx-react';
// import { Panel } from 'react-bootstrap';

import InventionsFeed from './InventionsFeed';
import PersonsFeed from './PersonsFeed';
import GeoEventsFeed from './GeoEventsFeed';
import ExportFromFeed from './ExportFromFeed';

import './Feed.less';

@inject('store')
@observer
class Feed extends React.Component {
  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          {' '}
          { 'Лента событий' }
          {' '}
        </h3>
        <div className='feed-panel'>
          <div header="Люди" eventKey="1">
            <PersonsFeed />
          </div>
          <div header="Геополитические события" eventKey="2">
            <GeoEventsFeed />
          </div>
          <div header="Изобретения" eventKey="3">
            <InventionsFeed />
          </div>
        </div>
        <hr />
        <ExportFromFeed />
      </div>
    );
  }
}

export default Feed;
