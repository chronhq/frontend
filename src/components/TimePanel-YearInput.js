import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextYear, prevYear, resetYear, startPlaying, stopPlaying } from '../reducers/actions';
import { setYear } from '../reducers/actions';

function validate(now) {
  return {
    now: now.length === 0 || now > 2000,
  };
}

class YearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: this.props.now,
    };
  }

   componentWillReceiveProps(nextProps) {
    this.setState({ now: nextProps.now });
  }

  handlePress(event) {
    switch (event.key) {
      case 'Enter':
        this.props.setYearAction(Number(this.state.now));
        break;
      default:
        break;
    }
  }

  handleChange(event) {
    console.log(`change: ${event.target.value}`);
    if (isNaN(event.target.value)) {
      console.log('shit');
    } else {
      this.setState({ now: event.target.value });
    }
  }

  render() {
    const errors = validate(this.state.now);

    return(
      <input
        type="text"
        pattern="[0-9]*"
        value={this.state.now}
        onKeyDown={event => this.handlePress(event)}
        onChange={event => this.handleChange(event)}
        className={errors.now ? 'yearInput error' : 'yearInput'}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    playing: state.timeline.intervalId,
    now: state.timeline.year.now,
    max: state.timeline.year.max,
    min: state.timeline.year.min
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setYearAction: bindActionCreators(setYear, dispatch),
  };
}


YearInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  setYearAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(YearInput);
