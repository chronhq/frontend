import React from 'react';
import { YMInitializer } from 'react-yandex-metrika';
import ym from 'react-yandex-metrika';

import 'font-awesome/less/font-awesome.less';


import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import Intro from './Intro';

import './SidePanel.less';


const YmId = (process.env.NODE_ENV === 'production') ? [42857239, 42866674] : [42866674];

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      style: { float: 'right' },
      isIntroOn: (process.env.NODE_ENV === 'production'),
    };
  }

  componentDidMount() {
    this.logPageView();
  }

  logPageView() {
    // console.log('=====YM=====>', location.pathname);
    // console.log(`Id is ${hit}`);
    ym('hit', location.pathname);
  }

  toggle = (id) => {
    // this.logPageView(id);
    //  console.log(`this is id ${id}`);
    //  console.log(`this is current ${this.state.current} and isopen is ${this.state.isOpen}`);
    const isOpen = !(this.state.current === id && this.state.isOpen === true);
    this.setState({ ...this.state, isOpen, current: id });
  }

  toggleIntro = () => {
    this.setState({ isIntroOn: !this.state.isIntroOn });
  }


  render() {
    // const onTopStyle = { 'z-index': 1000, };
    return (

      <div>

        <YMInitializer accounts={YmId} options={{ defer: true }} />
        <div className="icon-bar" style={this.onTopStyle}>
          <button onClick={() => this.toggleIntro()}> <i className="fa fa-home fa-fw" /></button>
          <button onClick={() => this.toggle(2)}><i className="fa fa-search fa-fw" /></button>
          <button onClick={() => this.toggle(3)}><i className="fa fa-list-ul fa-fw" /></button>
          <button onClick={() => this.toggle(4)}><i className="fa fa-globe fa-fw" /></button>
          <button onClick={() => this.toggle(5)}><i className="fa fa-cog fa-fw" /></button>
        </div>

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
      <div className="col-md-12"><input type="text" disabled className="search" placeholder="Поиск" /></div>
    </div>
    <p> В скором времени в этой вкладке появится возможность
      быстрого поиска по изобретениям и персонам. </p>
  </div>
);

export default SidePanel;
