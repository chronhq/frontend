import React from 'react';
import { inject, observer } from 'mobx-react';
import { Panel } from 'react-bootstrap';

import InventionsFeed from './InventionsFeed';
import PersonsFeed from './PersonsFeed';
import GeoEventsFeed from './GeoEventsFeed';
import ExportFromFeed from './ExportFromFeed';
// import { selectLocation } from '../../reducers/actions';

import './Feed.less';

@inject('store')
@observer
class Feed extends React.Component {
  render() {
    return (
      <div className='feed'>
        <h3> Лента событий </h3>
        <div className='feed-panel'>
          <Panel header="Люди" eventKey="1">
            <PersonsFeed />
          </Panel>
          <Panel header="Геополитические события" eventKey="2">
            <GeoEventsFeed />
          </Panel>
          <Panel header="Изобретения" eventKey="3">
            <InventionsFeed />
          </Panel>
        </div>
        <hr />
        <ExportFromFeed />
      </div>
    );
  }
}

export default Feed;
