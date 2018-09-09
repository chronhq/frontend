import React from 'react';
import PropTypes from 'prop-types';

class MailInput extends React.Component {
  state = {
    valid: true
  };

  handleInvalid(e) {
    e.preventDefault();
    this.setState({ valid: false });
    this.forceUpdate();
  }

  render() {
    return (
      <div className='input--cell'>
        <input
          style={{ gridRow: '1 / 2' }}
          type='email'
          className={(this.state.valid) ? '' : 'invalid'}
          value={this.props.value}
          size='25'
          pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$'
          onInvalid={e => this.handleInvalid(e)}
          placeholder={this.props.placeholder}
          required
          onChange={(e) => {
            this.setState({ valid: true });
            this.props.cb({ [this.props.name]: e.target.value });
          }}
        />
        <span
          style={{ gridRow: '2 / 3' }}
          className={(this.state.valid)
            ? 'invalid-message__hidden' : 'invalid-message'}
        >
          {this.props.invalid}
        </span>
      </div>
    );
  }
}

MailInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  invalid: PropTypes.string.isRequired
};

export default MailInput;
