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
import { observer } from 'mobx-react';
import { computed, action, observable } from 'mobx';
import './LayerToggleSummer.less';

@observer
class LayerToggle extends React.Component {
  @observable keyDownStatus = false;

  @observable lastEventTime = 0;

  keepStatus = action(() => {
    const time = Math.round(Number(new Date()) / 500);
    // Keep value received from first event in sequence from [touchStart, mouseDown]
    if (time !== this.lastEventTime) {
      this.lastEventTime = time;
      this.keyDownStatus = this.props.checked;
    }
  })

  @computed get className() {
    return [
      'image-button',
      this.props.checked ? 'image-button__checked' : '',
      this.props.extraClassName,
    ].join(' ');
  }

  toggle = (e) => {
    e.preventDefault();
    // prevent updating props during the key down event (aka hook for ModalWrapper)
    if (this.keyDownStatus === this.props.checked) {
      this.props.click(this.props.name, !this.props.checked);
    }
  };

  render() {
    return (
      <div className={`layer-toggle__wrapper ${this.props.wrapper}`}>
        {this.props.children}
        <div className='layer-toggle__container'>
          <div
            role='button'
            className='round-button'
            tabIndex={0}
            onKeyPress={this.toggle}
            onClick={this.toggle}
            onKeyDown={this.keepStatus}
            onTouchStart={this.keepStatus}
            onMouseDown={this.keepStatus}
          >
            <div
              style={this.props.extraStyle}
              className={this.className}
            />
          </div>
          <div className='tooltip-author controls-text-shadow layer-toggle__label'>
            {this.props.tooltip}
          </div>
        </div>
      </div>
    );
  }
}

LayerToggle.defaultProps = {
  checked: true,
  wrapper: '',
  extraClassName: '',
  extraStyle: {},
};

LayerToggle.propTypes = {
  tooltip: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  wrapper: PropTypes.string,
  extraClassName: PropTypes.string,
  extraStyle: PropTypes.object,
  name: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default LayerToggle;
