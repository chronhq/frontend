import React from 'react';
import 'font-awesome/less/font-awesome.less';

import ControlButtonsController from '../containers/ControlButtonsController';
import SetYearFieldContainer from '../containers/SetYearFieldContainer';
import SetProjectionContainer from '../containers/SetProjectionContainer';
import SetLayerVisibility from '../containers/SetLayerVisibility';
import Legend from '../containers/Legend';

import './SidePanel.less';

class SidePanel extends React.Component {
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
          <button onClick={() => this.toggle(5)}><i className="fa fa-cog fa-fw" /></button>
        </div>
        {this.state.isOpen ?
          <div className="sidenav">
            {this.state.current === 1 ? <ControlButtonsController /> : null }
            {this.state.current === 2 ? <SetYearFieldContainer /> : null }
            {this.state.current === 3 ? <SetLayerVisibility /> : null }
            {this.state.current === 4 ? <SetProjectionContainer /> : null }
            {this.state.current === 5 ? <Legend /> : null }
          </div> : null
       }
      </div>
    );
  }
}

export default SidePanel;
