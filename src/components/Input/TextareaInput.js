/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import PropTypes from 'prop-types';

class TextareaInput extends React.Component {
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
        <textarea
          type='text'
          value={this.props.value}
          placeholder={this.props.placeholder}
          className={(this.state.valid) ? '' : 'invalid'}
          // pattern='^[a-zA-Z0-9._%+-]'
          onInvalid={e => this.handleInvalid(e)}
          rows='8'
          maxLength='2000'
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

TextareaInput.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  invalid: PropTypes.string.isRequired
};

export default TextareaInput;
