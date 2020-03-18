/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observer, inject } from 'mobx-react';

import { computed, observable, action } from 'mobx';

import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../Button/Button';

import './ColorPicker.less';

/* eslint-disable jsx-a11y/anchor-is-valid */
const ColorBubble = ({
  color, id, selected, click
}) => (
  <Button
    btnType={BUTTON_TYPE.ICON}
    btnSize={BUTTON_SIZE.AUTO}
    onClick={() => click(Number(id))}
  >
    <span
      className={selected ? 'color-button color--selected' : 'color-button color'}
      style={{ backgroundColor: color }}
    />
  </Button>
);

@inject('store')
@observer
class ColorPicker extends React.Component {
  @observable palette = undefined;

  @computed get colorInfo() {
    return this.props.store.data.mapcolorscheme.data[this.props.selected];
  }

  @computed get mapColors() {
    return this.props.store.admin.mapColors;
  }

  @computed get paletteColors() {
    return this.palette ? this.mapColors[this.palette].colors : [];
  }

  render() {
    return (
      <div>
        <div className='color-picker'>
          {Object.keys(this.mapColors).map((c) => (
            <ColorBubble
              click={action(() => { this.palette = c; })}
              color={this.mapColors[c].main.color}
              id={c}
              key={this.mapColors[c].main.id}
              selected={false}
            />
          ))}
        </div>
        <div className='color-picker'>
          {this.paletteColors.map((c) => (
            <ColorBubble
              click={this.props.changeColor}
              color={c.color}
              id={c.id}
              key={c.id}
              selected={this.props.selected === c.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  selected: PropTypes.number.isRequired,
  changeColor: PropTypes.func.isRequired
};

export default ColorPicker;
