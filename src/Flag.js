import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';

@inject('store')
@observer
class Flag extends React.Component {
  @computed get flag() {
    return this.props.store.flags.get(this.props.name);
  }
  @computed get component() {
    return this.flag
      ? this.props.render
      : this.props.fallbackRender;
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
