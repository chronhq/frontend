import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';

import { YMInitializer } from 'react-yandex-metrika';
import ym from 'react-yandex-metrika';

import 'font-awesome/less/font-awesome.less';


import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import Intro from './Intro';
import Feedback from './Feedback/';
import Modal from './Modal';

import './SidePanel.less';


const YmId = (process.env.NODE_ENV === 'production') ? [42857239, 42866674] : [42866674];

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      style: { float: 'right' },
      isIntroOn: (process.env.NODE_ENV === 'production'),
      isFeedbackOn: false,
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
    const isOpen = !(this.state.current === id && this.state.isOpen === true);
    this.setState({ ...this.state, isOpen, current: id });
  }

  toggleIntro = () => {
    this.setState({ isIntroOn: !this.state.isIntroOn });
  }

  toggleFeedback = () => {
    console.log('toggleFeedback');
    this.setState({ isFeedbackOn: !this.state.isFeedbackOn });
  }

  FeedbackButton = () => (
    <div className='export-buttons'>
      <Button bsStyle='default' onClick={() => this.toggleFeedback()}><i className='fa fa-comment fa-fw' />Кнопка</Button>
    </div>
  );

  render() {
    return (

      <div>

        <YMInitializer accounts={YmId} options={{ defer: true }} />
        <div className="icon-bar" style={this.onTopStyle}>
          <ButtonToolbar>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Интро')} >
              <Button bsStyle='default' onClick={() => this.toggleIntro()}><i className='fa fa-home fa-fw' /> </Button>
              {/* <Button bsStyle='default' onClick={() => this.toggle(1)}><i className='fa fa-home fa-fw' /> </Button> */}
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Поиск')}>
              <Button bsStyle='default' onClick={() => this.toggle(2)}><i className='fa fa-search fa-fw' /></Button>
            </OverlayTrigger>

            <OverlayTrigger placement='left' delayHide={0}  overlay={tooltip('Лента событий')}>
              <Button bsStyle='default' onClick={() => this.toggle(3)}><i className='fa fa-list-ul fa-fw' /></Button>
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Легенда')}>
              <Button bsStyle='default' onClick={() => this.toggle(4)}><i className='fa fa-globe fa-fw' /></Button>
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Настройки проекции')}>
              <Button bsStyle='default' onClick={() => this.toggle(5)}><i className='fa fa-cog fa-fw' /></Button>
            </OverlayTrigger>

          </ButtonToolbar>
        </div>

        <Intro isOpen={this.state.isIntroOn} onClose={() => this.toggleIntro()} />
        {/* <Intro isOpen={this.state.current === 1} onClose={() => this.toggle(1)} />  */}
        <Feedback isOpen={this.state.isFeedbackOn} onClose={() => this.toggleFeedback()} />

        {this.state.isOpen &&
          <div className="sidenav">
            {this.state.current === 9 && <div> Empty</div> }
            {this.state.current === 2 && <SearchPanel /> }
            {this.state.current === 3 && <Feed /> }
            {this.state.current === 4 && <Legend /> }
            {this.state.current === 5 &&
              <Settings onClose={() => this.toggleFeedback()} />
            }
          </div>
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
