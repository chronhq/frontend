import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button, FormControl, ControlLabel } from 'react-bootstrap';

import { YMInitializer } from 'react-yandex-metrika';
import ym from 'react-yandex-metrika';

import 'font-awesome/less/font-awesome.less';

import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import Intro from './Intro';
import Feedback from './Feedback/';
import ControlButtons from '../components/ControlButtons';
import TimePanel from './TimePanel';
import ReturnUiButton from './Timeline/ReturnUiButton';

import './SidePanel.less';


const YmId = (process.env.NODE_ENV === 'production') ? [42857239, 42866674] : [42866674];

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

class AlignToggler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'right',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.cb(`${this.state.value}`);
  }

  render() {
    return (
      <div className='text-center'>
        <h3> Debug </h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <ControlLabel>UI Align</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={e => this.handleChange(e)}>
            <option value='right'>Правое</option>
            <option value='left'>Левое</option>
            <option value='none'>none</option>
          </FormControl>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      isIntroOn: (process.env.NODE_ENV === 'production'),
      isFeedbackOn: false,
      UI: { alignPanel: 'right' }
    };
  }

  // get iconBarStyle() {
  //   return (
  //       position: 'fixed',
  //       this.state.alignPanel == left ? 'right: 0' : 'left: 0',
  //       float: 'right',
  //       top: 0,
  //       width: '50px',
  //   );
  // }

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

  handleChange = (type, data) => {
    // console.log('have new data in handle change', data);
    const UI = {
      ...this.state.UI,
    };
      // [type]: { ...this.state.UI[type], ...data }
    UI[type] = data;
    // console.log(data);
    this.setState({ UI });
    // this.forceUpdate();
  }


  FeedbackButton = () => (
    <div className='export-buttons'>
      <Button bsStyle='default' onClick={() => this.toggleFeedback()}><i className='fa fa-comment fa-fw' />Кнопка</Button>
    </div>
  );

  render() {
    if (this.state.UI.alignPanel === 'none') {
      return <ReturnUiButton cb={data => this.handleChange('alignPanel', data)}/>;
      // return null;
    }
    return (

      <div>
        <YMInitializer accounts={YmId} options={{ defer: true }} />
        <div className={this.state.UI.alignPanel === 'left' ? 'icon-bar--left icon-bar' : 'icon-bar--right icon-bar'} >
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
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Легенда')}>
              <Button bsStyle='default' onClick={() => this.toggle(4)}><i className='fa fa-globe fa-fw' /></Button>
            </OverlayTrigger>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Настройки проекции')}>
              <Button bsStyle='default' onClick={() => this.toggle(5)}><i className='fa fa-cog fa-fw' /></Button>
            </OverlayTrigger>

            {(process.env.NODE_ENV !== 'production') &&
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Debug')}>
              <Button bsStyle='default' onClick={() => this.toggle(6)}><i className='fa fa-cog fa-fw' /></Button>
            </OverlayTrigger>
            }

          </ButtonToolbar>
        </div>

        <Intro isOpen={this.state.isIntroOn} onClose={() => this.toggleIntro()} />
        {/* <Intro isOpen={this.state.current === 1} onClose={() => this.toggle(1)} />  */}
        <Feedback isOpen={this.state.isFeedbackOn} onClose={() => this.toggleFeedback()} />

        {this.state.isOpen &&
          <div className={this.state.UI.alignPanel === 'left' ? 'sidenav--left sidenav' : 'sidenav--right sidenav'} >
            {this.state.current === 9 && <div> Empty</div> }
            {this.state.current === 2 && <SearchPanel /> }
            {this.state.current === 3 && <Feed /> }
            {this.state.current === 4 && <Legend /> }
            {this.state.current === 5 &&
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


const UI = () => (
  <div>
    <TimePanel />
    <SidePanel />
  </div>
);

export default UI;
