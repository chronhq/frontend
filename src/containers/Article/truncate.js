import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class TrucatePart extends React.Component {
  toggleArticle(e) {
    e.stopPropagation();
    // set data for showing within model or somehow else
    this.props.store.flags.runtime.set('article', true);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.string.substring(128)}
        <button
          onClick={e => this.toggleArticle(e)}
          type='button'
          className='truncate-dots'
        >
          {'Expand'}
        </button>
      </React.Fragment>
    );
  }
}

const truncateText = string => ((string.length < 128)
  ? string
  : <TrucatePart string={string} />
);

export default truncateText;
