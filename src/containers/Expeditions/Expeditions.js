import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import PathAnimation from './PathAnimation';

@inject('store')
@observer
class Expeditions extends React.Component {
  @computed get traces() {
    return this.props.store.prepared.expeditions;
  }
  render() {
    return (
      <g>
        {this.traces.map(trace =>
          <PathAnimation key={trace.data.id} points={trace.projected} />)}
      </g>);
  }
}

export default Expeditions;
