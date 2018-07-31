import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class FontLoader extends React.Component {
  render() {
    const fonts = Object.keys(this.props.store.prepared.toponymsRaw);
    const display = this.props.store.flags.flags.runtime.Ready === true
      ? 'none' : 'inline';
    return (
      <div style={{ display, visibility: 'hidden' }}>
        {fonts.map(font => (
          <p key={font} style={{ fontFamily: font }}>
            {font}
          </p>
        ))}
      </div>
    );
  }
}
