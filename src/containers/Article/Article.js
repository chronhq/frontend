import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import './Article.less';

@inject('store')
@observer
class Article extends React.Component {
  @computed get isOpen() {
    return this.props.store.flags.runtime.get('article');
  }


  @computed get timeline() {
    return this.props.store.data.CourseTimelines.data;
  }

  @computed get tick() {
    return this.props.store.year.tick;
  }

  closeFeedback(e) {
    e.stopPropagation();
    this.props.store.flags.runtime.set('article', false);
  }

  handleOverlay(e) {
    if (e.keyCode === 13) {
      this.closeFeedback(e);
    }
  }

  clickOutside(e) {
    if (!this.modal || this.modal.contains(e.target)) {
      return;
    }
    this.closeFeedback(e);
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    return (
      <div
        className='black-overlay'
        role='button'
        tabIndex='0'
        onClick={e => this.clickOutside(e)}
        onKeyUp={e => this.handleOverlay(e)}
      >
        <div
          className='article'
          ref={(ref) => { this.modal = ref; }}
        >
          <button
            onClick={e => this.closeFeedback(e)}
            className='close-window'
            type='button'
          >
            <span className="lnr lnr-cross" />
          </button>
          <div className='article--title'>
            <b>
              {this.timeline[this.tick] ? this.timeline[this.tick].title : ''}
            </b>
          </div>
          <div className='article--body'>
            {this.timeline[this.tick] ? this.timeline[this.tick].description : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
