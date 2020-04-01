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
import { computed, observable, action } from 'mobx';
import { observer } from 'mobx-react';

import ModalWrapper from '../../components/ModalWrapper';
import LayerToggle from '../../components/LayerToggle/LayerToggleSummer';
import CloseButton from '../../components/Button/CloseButton';

@observer
class ExtraSideMenu extends React.Component {
  @observable menu = false;

  toggleMenu = action(() => {
    this.menu = !this.menu;
  });

  @computed get menuStyle() {
    return {
      visibility: this.menu === true ? 'initial' : 'hidden'
    };
  }

  render() {
    return (
      <LayerToggle
        tooltip={this.props.tooltip}
        extraClassName={this.props.extraClassName}
        wrapper={this.props.wrapper}
        name={this.props.name}
        checked={this.menu}
        click={this.toggleMenu}
      >
        <ModalWrapper close={this.toggleMenu} isOpen={this.menu}>
          <div style={this.menuStyle} className='float-container side-bar__extra side-bar__extra--menu'>
            <CloseButton compact onClick={this.toggleMenu} />
            {this.props.children}
          </div>
        </ModalWrapper>
      </LayerToggle>
    );
  }
}

export default ExtraSideMenu;
