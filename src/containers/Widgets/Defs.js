import React from 'react';
import { inject, observer } from 'mobx-react';
import { PatternsDefs, MapPicsDefs } from '../../components/SVGPatternsDefs';

@inject('store')
@observer
export default class Defs extends React.Component {
  render() {
    return (
      <defs>
        <PatternsDefs
          bordersColors={this.props.store.colors.colors}
        />
        <MapPicsDefs symbols={this.props.store.data.MapPics.data} />
      </defs>
    );
  }
}
