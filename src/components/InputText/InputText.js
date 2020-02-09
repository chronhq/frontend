/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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

import { observer } from 'mobx-react';

@observer
class InputText extends React.Component {
  submit = () => {
    this.props.onEnterPress(this.props.value);
  }

  render() {
    return (
      <input
        className='text-input input-text'
        type='text'
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={(e) => e.key === 'Enter' && this.submit()}
      />
    );
  }
}

InputText.defaultProps = {
  onBlur: () => null,
  onEnterPress: () => null, // (v) => console.log('InputText submit', v)
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onEnterPress: PropTypes.func,
};

export default InputText;
