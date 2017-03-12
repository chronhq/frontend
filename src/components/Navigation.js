import React from 'react';
import './Navigation.less';

class Navigation extends React.Component {
  render() {
    return (
      <div id='navigation' className='btn-group-vertical'>
        <button className='btn btn-default'> <i className='fa fa-rotate-left' /> </button>
        <button className='btn btn-default'> <i className='fa fa-rotate-right' /> </button>
        <hr />
        <button className='btn btn-default'> <i className='fa fa-plus' /> </button>
        <button className='btn btn-default'> <i className='fa fa-minus' /> </button>
      </div>
    );
  }
}

export default Navigation;
