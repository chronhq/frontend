import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import ym from 'react-yandex-metrika';

import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import Intro from './Intro';
import Feedback from './Feedback/';
import ControlButtons from '../components/ControlButtons';
import AlignToggler from './Debug';
import './SidePanel.less';

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      isIntroOn: (process.env.NODE_ENV === 'production'),
      isFeedbackOn: false,
    };
  }

  componentDidMount() {
    ym('hit', 'world');
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

  handleChange = (type, data) => {
    // console.log('have new data in handle change', data);
    // const UI = {
    //   ...this.props.facade,
    // };
    //   // [type]: { ...this.props.facade[type], ...data }
    // UI[type] = data;
    // // console.log(data);
    // this.setState({ UI });
    // this.forceUpdate();
  }


  FeedbackButton = () => (
    <div className='export-buttons'>
      <Button bsStyle='default' onClick={() => this.toggleFeedback()}><i className='fa fa-comment fa-fw' />Кнопка</Button>
    </div>
  );

  render() {
    return (
      <div>
        <div className={this.props.facade.alignPanel === 'left' ? 'icon-bar--left icon-bar' : 'icon-bar--right icon-bar'} >
          <ButtonToolbar>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Интро')} >
              <Button bsStyle='default' onClick={() => this.toggleIntro()}><i className='fa fa-home fa-fw' /> </Button>
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Поиск')}>
              <Button bsStyle='default' onClick={() => this.toggle(2)}><i className='fa fa-search fa-fw' /></Button>
            </OverlayTrigger>

            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Лента событий')}>
              <Button bsStyle='default' onClick={() => this.toggle(3)}><i className='fa fa-list-ul fa-fw' /></Button>
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Настройки проекции')}>
              <Button bsStyle='default' onClick={() => this.toggle(4)}><i className='fa fa-cog fa-fw' /></Button>
            </OverlayTrigger>

            {(process.env.NODE_ENV !== 'production') &&
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Debug')}>
              <Button bsStyle='default' onClick={() => this.toggle(6)}><i className='fa fa-cog fa-fw' /></Button>
            </OverlayTrigger>
            }
          </ButtonToolbar>
        </div>

        <Intro isOpen={this.state.isIntroOn} onClose={() => this.toggleIntro()} />
        <Feedback isOpen={this.state.isFeedbackOn} onClose={() => this.toggleFeedback()} />

        {this.state.isOpen &&
          <div className={this.props.facade.alignPanel === 'left' ? 'sidenav--left sidenav' : 'sidenav--right sidenav'} >
            {this.state.current === 9 && <div> Empty</div> }
            {this.state.current === 2 && <SearchPanel /> }
            {this.state.current === 3 && <Feed /> }
            {this.state.current === 4 &&
              <Settings onClose={() => this.toggleFeedback()} />
            }
            {this.state.current === 7 && null }
            {this.state.current === 6 &&
              <div>
                <AlignToggler cb={data => this.handleChange('alignPanel', data)} />
                <ControlButtons />
              </div>
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

function mapStateToProps(state) {
  return { facade: state.runtime.facade };
}

export default connect(mapStateToProps)(SidePanel);
