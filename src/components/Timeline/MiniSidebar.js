import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import 'MiniSidebar.less';
import Timeline from './Timeline';
import { changeTick } from '../../reducers/actions';

function changeUI(data) {
  return {
    type: 'CHANGE_UI',
    data
  };
}

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

class MiniSidebarOld extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    timeline: PropTypes.object.isRequired,
    // events: PropTypes.object.isRequired,
    tick: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
  }

  handleToggle() {
    // console.log('');
    // this.props.cb(`right`);
    this.props.changeUI({  alignPanel: 'right' });
  }

  handleNext() {
    console.log('next');
    // if (this.props.tim
    this.props.timeline[parseInt(this.props.tick) + 1] && this.props.changeTick(parseInt(this.props.tick) + 1);
  }

  handlePrevious() {
    console.log('previous');
    this.props.timeline[this.props.tick - 1] && this.props.changeTick(this.props.tick - 1);
  }

  render() {
    return (
      <div>
        <div className='icon-bar--small'>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Вернуть UI')} >
            <Button bsStyle='default' onClick={() => this.handleToggle()}><i className='fa fa-home fa-fw' /> </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Previous')} >
            <Button bsStyle='default' onClick={() => this.handlePrevious()}><i className='fa fa-angle-up fa-fw' /> </Button>
          </OverlayTrigger>
          <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Next')} >
            <Button bsStyle='default' onClick={() => this.handleNext()}><i className='fa fa-angle-down fa-fw' /> </Button>
          </OverlayTrigger>
        </div>
        <Timeline />
      </div>
    );
  }
}

// class SomeButtons extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div>
//         <Button> ^ </Button>
//         <Button> </Button>
//       </div>

//     );
//   }
//   // methods
// }

const MiniSidebar = () => (
  <Timeline />
);

function mapStateToProps(state) {
  return {
    facade: state.runtime.facade,
    tick: state.timeline.year.tick,
    timeline: state.courses.timeline.tick
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUI: bindActionCreators(changeUI, dispatch),
    changeTick: bindActionCreators(changeTick, dispatch)
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(MiniSidebar);
export default MiniSidebar;
