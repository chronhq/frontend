import React from 'react';
import 'font-awesome/less/font-awesome.less';

import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import RotatingLogo from './RotatingLogo';
import Modal from './Modal';
import Intro from './Intro';

import './SidePanel.less';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      style: { float: 'right' },
      isSurveyOn: false,
      isIntroOn: true,
    };
  }

  toggle = (id) => {
    //  console.log(`this is id ${id}`);
    //  console.log(`this is current ${this.state.current} and isopen is ${this.state.isOpen}`);
    const isOpen = !(this.state.current === id && this.state.isOpen === true);
    this.setState({ ...this.state, isOpen, current: id });
  }

  toggleSurvey = () => {
    this.setState({ isSurveyOn: !this.state.isSurveyOn });
  }

  toggleIntro = () => {
    this.setState({ isIntroOn: !this.state.isIntroOn });
  }


  render() {
    // const onTopStyle = { 'z-index': 1000, };
    return (

      <div>
        <div className="icon-bar" style={this.onTopStyle}>
          <button onClick={() => this.toggleIntro()}> <i className="fa fa-home fa-fw" /></button>
          <button onClick={() => this.toggle(2)}><i className="fa fa-search fa-fw" /></button>
          <button onClick={() => this.toggle(3)}><i className="fa fa-list-ul fa-fw" /></button>
          <button onClick={() => this.toggle(4)}><i className="fa fa-globe fa-fw" /></button>
          <button onClick={() => this.toggle(5)}><i className="fa fa-cog fa-fw" /></button>
          <button onClick={() => this.toggleSurvey()}><i className="fa fa fa-question fa-fw" /></button>
        </div>

        <Modal isOpen={this.state.isSurveyOn} onClose={() => this.toggleSurvey()} />
        <Intro isOpen={this.state.isIntroOn} onClose={() => this.toggleIntro()} />

        {this.state.isOpen ?
          <div className="sidenav">
            {this.state.current === 1
              ? <div>
                <h3> Empty </h3>
              </div>
              : null }
            {this.state.current === 2
              ? <SearchPanel />
              : null }
            {this.state.current === 3 ? <Feed /> : null }
            {this.state.current === 4 ? <Legend /> : null }
            {this.state.current === 5 ? <Settings /> : null }
          </div> : null
       }
      </div>
    );
  }
}


const SearchPanel = () => (
  <div className='search'>
    <h3> Поиск </h3>
    <div className="row">
      <div className="col-md-12"><input type="text" disabled={true} className="search" placeholder="Поиск" /></div>
      </div>
    <p> В скором времени в этой вкладке появится возможность быстрого поиска по изобретениям и персонам. </p>
  </div>
);

export default SidePanel;
