import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
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
          type='text'
          value={this.props.value}
          placeholder={this.props.placeholder}
          className={(this.state.valid) ? '' : 'invalid'}
          maxLength='80'
          // pattern='^[a-zA-Zа-яА-я0-9._%+-]'
          onInvalid={e => this.handleInvalid(e)}
          onChange={(e) => {
            this.setState({ valid: true });
            this.props.cb({ [this.props.name]: e.target.value });
          }}
          required
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

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  invalid: PropTypes.string.isRequired
};

export default TextInput;
