import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testApi } from '../reducers/apiTest';

class ApiButton extends Component {
  render() {
    return (
      <span className='playButton'>
        <button onClick={this.props.testApi}>Test Api</button>
      </span>);
  }
}
function mapStateToProps(state) { return { data: state.apiTest }; }
function mapDispatchToProps(dispatch) {
  return {
    testApi: bindActionCreators(testApi, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ApiButton);
