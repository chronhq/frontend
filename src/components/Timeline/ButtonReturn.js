import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Tooltip } from '../Input';

@inject('store')
@observer
class ButtonReturn extends React.Component {
  handleClick() {
    this.props.store.effects.course.enableCourseSelection();
    this.props.history.push('/');
  }

  render() {
    return (
      <Tooltip content={this.props.store.i18n.tooltips.back} placement='left'>
        <button onClick={() => this.handleClick()} type='button'>
          <span className='lnr lnr-home' />
        </button>
      </Tooltip>
    );
  }
}

export default withRouter(ButtonReturn);
