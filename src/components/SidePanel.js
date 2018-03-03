import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { observable, computed, action } from 'mobx';

import Settings from '../containers/Settings';
import Feed from '../containers/Feed';
// import Legend from '../containers/Legend';
import Intro from './Intro/Carousel';
import Feedback from './Feedback/';
import ControlButtons from '../components/ControlButtons';
import AlignToggler from './AlignToggler';
import './SidePanel.less';

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

@inject('store')
@observer
class SidePanel extends React.Component {
  @computed get alignPanel() {
    return this.props.store.flags.flags.runtime.alignPanel;
  }

  @computed get iconBarAlign() {
    return this.alignPanel === 'left'
      ? 'icon-bar--left icon-bar'
      : 'icon-bar--right icon-bar';
  }

  @computed get sideNavAlign() {
    return this.alignPanel === 'left'
      ? 'sidenav--left sidenav'
      : 'sidenav--right sidenav';
  }

  @observable isOpen = false;
  @observable current = 0;

  @action toggle(id) {
    this.isOpen = !(this.current === id && this.isOpen === true);
    this.current = id;
  }

  @action openIntro() {
    this.props.store.flags.flags.runtime.intro = true;
  }

  render() {
    return (
      <div>
        <div className={this.iconBarAlign} >
          <ButtonToolbar>
            <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Интро')} >
              <Button bsStyle='default' onClick={() => this.openIntro()}><i className='fa fa-home fa-fw' /> </Button>
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

        <Intro />
        <Feedback />

        {this.isOpen &&
          <div className={this.sideNavAlign} >
            {this.current === 9 && <div> Empty</div> }
            {this.current === 2 && <SearchPanel /> }
            {this.current === 3 && <Feed /> }
            {this.current === 4 && <Settings /> }
            {this.current === 7 && null }
            {this.current === 6 &&
              <div>
                <AlignToggler />
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
      быстрого поиска по изобретениям и персонам.
    </p>
  </div>
);

export default SidePanel;
