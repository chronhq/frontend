import React from 'react';
import 'font-awesome/less/font-awesome.less';

import ControlButtonsController from '../containers/ControlButtonsController';
import SetYearFieldContainer from '../containers/SetYearFieldContainer';
import SetProjectionContainer from '../containers/SetProjectionContainer';
import SetLayerVisibility from '../containers/SetLayerVisibility';

import './UI.less';

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      style: { float: 'right' },
    };
  }

  toggle = (id) => {
    { /*
      console.log(`this is id ${id}`);
      console.log(`this is current ${this.state.current} and isopen is ${this.state.isOpen}`);
    */ }
    const isOpen = !(this.state.current === id && this.state.isOpen === true);
    this.setState({ ...this.state, isOpen, current: id });
  }

  render() {
    return (
      <div>
        <div className="icon-bar">
          <button id="Sidebar1" onClick={() => this.toggle(1)} > <i className="fa fa-home fa-fw" /></button>
          <button onClick={() => this.toggle(2)}><i className="fa fa-search fa-fw" /></button>
          <button onClick={() => this.toggle(3)}><i className="fa fa-clock-o fa-fw" /></button>
          <button onClick={() => this.toggle(4)}><i className="fa fa-globe fa-fw" /></button>
          <button onClick={() => this.toggle(3)}><i className="fa fa-bar-cog fa-fw" /></button>
        </div>
        {this.state.isOpen ?
          <div>
            {this.state.current === 1 ? <SideBar /> : null }
            {this.state.current === 2 ? <SideBar2 /> : null }
            {this.state.current === 3 ? <SideBar3 /> : null }
            {this.state.current === 4 ? <SideBar4 /> : null }
          </div> : null
       }
      </div>
    );
  }
}


class SideBar extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <ControlButtonsController />
      </div>
    );
  }
}

class SideBar2 extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <SetYearFieldContainer />
      </div>
    );
  }
}

class SideBar3 extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <SetProjectionContainer />
      </div>
    );
  }
}

class SideBar4 extends React.Component {
  render() {
    return (
      <div className="sidenav">
        <SetLayerVisibility />
      </div>
    );
  }
}

export default UI;
