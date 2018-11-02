import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Tooltip } from '../Input';

@inject('store')
@observer
class FatButton extends React.Component {
  get classes() {
    let classes = [];
    if (this.props.active === true) {
      classes.push('active');
    }
    if (this.props.disabled === true) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Tooltip placement='left' content={this.props.text}>
        <button
          onClick={() => this.props.cb()}
          className={this.classes}
          type='button'
          // disabled={this.props.disabled}
        >
          <i className={`lnr ${this.props.icon}`} />
        </button>
      </Tooltip>
    );
  }
}

FatButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired
};

export default FatButton;
