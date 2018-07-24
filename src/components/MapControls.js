import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import './MapControls.less';

const VertButton = ({ cb, fa }) => (
  <button
    className='btn btn-default'
    onClick={cb}
  >
    <span className={`lnr lnr-${fa}-circle`} />
  </button>
);

@inject('store')
@observer
class MapControls extends React.Component {
  @action handleReset() {
    this.props.store.view.transform = this.props.store.view.defaultTransform;
  }

  @action handleScale(step) {
    this.props.store.view.transform.k += step;
  }

  render() {
    return (
      <div id='mapControls' className='btn-group-vertical'>
        <VertButton fa='home' cb={() => this.handleReset()} />
        <hr />
        {/*
        <VertButton fa='rotate-left' cb={() => this.handleRotation(-15)} />
        <VertButton fa='rotate-right' cb={() => this.handleRotation(15)} />
        */}
        <hr />
        <VertButton fa='plus' cb={() => this.handleScale(1)} />
        <VertButton fa='minus' cb={() => this.handleScale(-1)} />
      </div>
    );
  }
}

export default MapControls;
