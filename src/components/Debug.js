import React from 'react';
import { OverlayTrigger, Tooltip, ButtonToolbar, Button, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function changeUI(data) {
  return {
    type: 'CHANGE_UI',
    data
  };
}

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
    // this.props.cb(`${this.state.value}`);
    // dispatch here
    this.props.changeUI({  alignPanel: this.state.value });
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

function mapStateToProps(state) {
  return { facade: state.runtime.facade };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUI: bindActionCreators(changeUI, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlignToggler);
