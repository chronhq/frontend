import React from 'react';
import 'font-awesome/less/font-awesome.less';

import ControlButtonsController from '../containers/ControlButtonsController';
import SetYearFieldContainer from '../containers/SetYearFieldContainer';
import SetProjectionContainer from '../containers/SetProjectionContainer';
import SetLayerVisibility from '../containers/SetLayerVisibility';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import RotatingLogo from './RotatingLogo';

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
          <button onClick={() => this.toggle(3)}><i className="fa fa-list-ul fa-fw" /></button>
          <button onClick={() => this.toggle(4)}><i className="fa fa-globe fa-fw" /></button>
          <button onClick={() => this.toggle(5)}><i className="fa fa-cog fa-fw" /></button>
        </div>
        {this.state.isOpen ?
          <div className="sidenav">
            {this.state.current === 1
              ? <div>
                <ControlButtonsController />
                <SetYearFieldContainer />
              </div>
              : null }
            {this.state.current === 2
              ? <div className='search'>
                <h3> Поиск </h3>
                <RotatingLogo />
              </div>
              : null }
            {this.state.current === 3 ? <Feed /> : null }
            {this.state.current === 4 ? <Legend /> : null }
            {this.state.current === 5
              ? <div>
                <h3> Настройка проекции </h3>
                <SetProjectionContainer />
                <SetLayerVisibility />
              </div>
              : null }
          </div> : null
       }
      </div>
    );
  }
}

export default SidePanel;
