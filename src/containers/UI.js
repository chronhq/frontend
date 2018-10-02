import React from 'react';
import { observer, inject } from 'mobx-react';
import Flag from '../Flag';

import MapViewport from './GeoLayers';
import SidePanel from './SidePanel';
import TimePanel from '../components/TimePanel/TimePanel';
import Timeline from '../components/Timeline';

import Bio from '../components/Timeline/Bio';
import Widgets from './Widgets';

import Feedback from '../components/Feedback';
import Balloon from './Balloon';
import YearInput from '../components/TimePanel/YearInput';

import FontLoader from './FontLoader';

@inject('store')
@observer
class Overlays extends React.Component {
  render() {
    return (
      <div id='overlays'>
        <Feedback />
        {this.props.store.flags.flags.runtime.yearInput ? <YearInput /> : null}
      </div>
    );
  }
}

/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
const MapPicsDownloadLink = () => (process.env.NODE_ENV === 'production'
  ? ''
  : (<a href='' visibility='hidden' id='mapPicsDownloadLink' />));
/* eslint-enable jsx-a11y/anchor-has-content */
/* eslint-enable jsx-a11y/anchor-is-valid */


const UI = () => (
  <div className='content'>
    <Widgets />
    <FontLoader />
    <Flag
      name='runtime.SelectedCourse'
      render={() => <Bio />}
      fallbackRender={() => <Overlays />}
    />
    <Flag
      name="UI.Balloon"
      render={() => <Balloon />}
    />
    <Flag
      name="UI.SidePanel"
      render={() => <SidePanel />}
    />
    <Flag
      name="UI.TimePanel"
      render={() => <TimePanel />}
    />
    <Flag
      name="UI.MiniSidebar"
      render={() => <Timeline />}
    />
    <Flag
      name="UI.MapViewport"
      render={() => <MapViewport />}
    />
    <MapPicsDownloadLink />
  </div>
);

export default UI;
