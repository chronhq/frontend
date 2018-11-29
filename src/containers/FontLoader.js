import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class FontLoader extends React.Component {
  render() {
    const fonts = Object.keys(this.props.store.prepared.decor.mapLabels.fonts);
    const display = this.props.store.courseSelection.loadingIsComplete === true
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

export default FontLoader;
