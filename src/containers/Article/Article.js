import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import './Article.less';

@inject('store')
@observer
class Article extends React.Component {
  @computed get isOpen() {
    return this.props.store.flags.runtime.get('article');
  }

  closeFeedback() {
    this.props.store.flags.runtime.set('article', false);
  }

  render() {
    if (this.isOpen === false) {
      return null;
    }
    return (
      <div className='article'>
        <button
          onClick={() => this.closeFeedback()}
          className='close-window'
          type='button'
        >
          <span className="lnr lnr-cross" />
        </button>
        {'Markup'}
        {this.props.text}
      </div>
    );
  }
}

Article.defaultProps = {
  text: ''
};

Article.propTypes = {
  text: PropTypes.string
};

export default Article;
