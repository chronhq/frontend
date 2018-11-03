import React from 'react';
import { inject, observer } from 'mobx-react';
import { MapPicsDefs } from '../../components/SVGPatternsDefs';

@inject('store')
@observer
class Defs extends React.Component {
  render() {
    return (
      <defs>
        <MapPicsDefs symbols={this.props.store.data.MapPics.data} />
      </defs>
    );
  }
}

export default Defs;
