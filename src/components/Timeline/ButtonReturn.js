import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Tooltip } from '../Input';

@inject('store')
@observer
class ButtonReturn extends React.Component {
  handleClick() {
    this.props.store.effects.course.toggleCourseSelection(true);
    this.props.history.push('/');
  }

  render() {
    return (
      <Tooltip content='Вернутся в основное меню' placement='bottom'>
        <button onClick={() => this.handleClick()} type='button'>
          <span className='lnr lnr-undo' />
        </button>
      </Tooltip>
    );
  }
}

export default withRouter(ButtonReturn);
