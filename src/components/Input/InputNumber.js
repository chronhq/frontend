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
import InputNumber from 'rc-input-number';

// import '../../styles/LineIcon.less';
import './InputNumber.less';

class Component extends React.Component {
  render() {
    const upHandler = (
      <div>
        <span className="lnr lnr-chevron-up" />
      </div>
    );
    const downHandler = (
      <div>
        <span className="lnr lnr-chevron-down" />
      </div>
    );
    return (
      <InputNumber
        min={this.props.min}
        max={this.props.max}
        value={this.props.value}
        placeholder={this.props.placeholder}
        style={{ width: 100 }}
        onChange={v => this.props.cb(v)}
        disabled={this.props.disabled}
        upHandler={upHandler}
        downHandler={downHandler}
      />
    );
  }
}

export default Component;
