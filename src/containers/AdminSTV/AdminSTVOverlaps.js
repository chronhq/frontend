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
import { observer, inject } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import ActionButton, { GiantActionButtonFillText } from '../../components/ActionButtons/ActionButtons';

@inject('store')
@observer
class STVOverlapsHandler extends React.Component {
  @observable entityKey = 0;

  setVisibleSTVs = action(() => {
    this.props.store.mapStyle.visibleSTVs = this.overlaps.stvs;
  })

  changeScreen = action((mod) => {
    this.entityKey += mod;
    if (this.entityKey >= this.maxScreen) this.entityKey = this.maxScreen;
    if (this.entityKey < 0) this.entityKey = 0;
    this.setVisibleSTVs();
  })

  componentDidMount() {
    this.setVisibleSTVs();
    this.props.form.confirmOverlaps(this.entity.id, this.subtract);
  }

  componentWillUnmount() {
    this.props.store.mapStyle.visibleSTVs = [];
  }

  @computed get maxScreen() {
    return Object.keys(this.props.form.conflicts).length - 1;
  }

  @computed get lastScreen() {
    return this.entityKey === this.maxScreen;
  }

  @computed get overlaps() {
    const key = Object.keys(this.props.form.conflicts)[this.entityKey];
    return { entity: key, stvs: this.props.form.conflicts[key] };
  }

  @computed get entity() {
    return this.props.store.data.territorialEntities.data[this.overlaps.entity];
  }

  @computed get subtract() {
    return this.props.form.overlaps
      ? this.props.form.overlaps[this.entity.id]
      : undefined;
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {this.entity.label}
          <GiantActionButtonFillText
            click={() => this.props.form.confirmOverlaps(this.entity.id, !this.subtract)}
            icon={this.subtract ? 'scissors--blue' : 'lock--blue'}
            text={this.subtract ? 'Subtracted' : 'Preserved'}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {this.entityKey === 0
            ? <ActionButton text='Abort' icon='cancel' click={this.props.form.cancelOverlap} />
            : <ActionButton text='Previous' icon='arrow-box__left' click={() => this.changeScreen(-1)} />}
          <div style={{ textAlign: 'center' }} className='admin-stv-card-main__font'>
            {`Step ${this.entityKey + 1} of ${this.maxScreen + 1}`}
          </div>
          {this.entityKey === this.maxScreen
            ? <ActionButton text='Save' icon='checkmark' click={this.props.form.upload} />
            : <ActionButton text='Next' icon='arrow-box__right' click={() => this.changeScreen(1)} />}
        </div>
      </div>
    );
  }
}

export default STVOverlapsHandler;
