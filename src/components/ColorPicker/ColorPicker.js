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

import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../Button/Button';
import mapColors from '../../models/MVTStyles/colors.json';
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

class ColorPicker extends React.Component {
  render() {
    return (
      <div className='color-picker'>
        {Object.keys(mapColors).map((c) => (
          <ColorBubble
            click={this.props.changeColor}
            color={c}
            id={mapColors[c]}
            key={mapColors[c]}
            selected={this.props.selected === mapColors[c]}
          />
        ))}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  selected: PropTypes.number.isRequired,
  changeColor: PropTypes.func.isRequired
};

export default ColorPicker;
