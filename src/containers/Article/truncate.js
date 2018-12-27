import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class TrucatePart extends React.Component {
  state = {
    showButton: false,
    blockHover: true
  }

  toggleArticle(e) {
    e.stopPropagation();
    // set data for showing within model or somehow else
    this.props.store.flags.runtime.set('article', true);
  }

  hideButton() {
    if (!this.state.blockHover) {
      setTimeout(() => this.setState({ showButton: false }), 300);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          className='truncate--text'
          onMouseOver={() => this.setState({ showButton: true })}
          onFocus={() => this.setState({ showButton: true })}
          onMouseOut={() => this.hideButton()}
          onBlur={() => this.hideButton()}
        >
          {this.props.string.substring(0, 128)}
        </div>
        <button
          onClick={e => this.toggleArticle(e)}
          type='button'
          onMouseOver={() => this.setState({ blockHover: true })}
          onFocus={() => this.setState({ blockHover: true })}
          onMouseOut={() => this.setState({ blockHover: false })}
          onBlur={() => this.setState({ blockHover: false })}
          className={this.state.showButton ? 'truncate--dots' : 'truncate--dots truncate--dots__hidden'}
        >
          {'Expand'}
        </button>
      </React.Fragment>
    );
  }
}

const truncateText = string => ((string.length < 128)
  ? <div>{string}</div>
  : <TrucatePart string={string} />
);

export default truncateText;
