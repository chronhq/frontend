import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';

@inject('store')
@observer
class Flag extends React.Component {
  @computed get component() {
    return this.flag
      ? this.props.render
      : this.props.fallbackRender;
  }

  @computed get flag() {
    const arr = this.props.name.split('.');
    const flag = arr.reduce((prev, cur) => (
      prev[cur]
    ), this.props.store.flags.flags);
    return flag;
  }

  render() {
    const Component = this.component;
    return (<Component {...this.props} render='' name='' fallbackRender='' />);
  }
}

Flag.defaultProps = {
  fallbackRender: () => '',
};

Flag.propTypes = {
  render: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  fallbackRender: PropTypes.any,
};

export default Flag;
