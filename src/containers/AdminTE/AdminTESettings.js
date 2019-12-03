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

import { observer, inject } from 'mobx-react';
import { computed, action } from 'mobx';

import ColorPicker from '../../components/ColorPicker/ColorPicker';
import TextTopic from './TextTopic';

import AdminLevels from '../../components/AdminLevels/AdminLevels';
import AdminTESearchCard from './AdminTESearchCard';
import AdminTESelector from './AdminTESelector';


@inject('store')
@observer
class AdminTESettings extends React.Component {
  @computed get form() {
    return this.props.store.admin.forms.te;
  }

  @computed get selected() {
    return this.form.data.selected;
  }

  @computed get data() {
    return this.form.data.form || {};
  }

  @action selectPredecessor(d) {
    if (d.id === this.selected.id) return;
    const idx = this.data.predecessor.findIndex((v) => v === d.id);
    if (idx === -1) {
      this.data.predecessor = [...this.data.predecessor, d.id];
    }
  }

  @action removePredecessor(idx) {
    this.data.predecessor = this.data.predecessor.filter((f, i) => idx !== i);
  }

  @action changeColor(c) {
    this.data.color = c;
  }

  @action changeAdmin(a) {
    this.data.admin_level = a;
  }

  render() {
    return this.selected ? (
      <div>
        <TextTopic text='2. Check main settings' />
        <AdminTESearchCard data={this.selected} selected />
        <div>
          <TextTopic text='2.1 Admin level' />
          <AdminLevels
            selected={this.data.admin_level}
            select={(a) => this.changeAdmin(a)}
          />
          <TextTopic text='2.2 Color' />
          <ColorPicker
            selected={Number(this.data.color)}
            changeColor={(c) => this.changeColor(c)}
          />
          <TextTopic text='Predecessor wikidata id' />
          {this.data.predecessor.map((p, idx) => (
            <div
              key={`pred_${p}`}
              role='button'
              onClick={() => this.removePredecessor(idx)}
              onKeyPress={() => this.removePredecessor(idx)}
              tabIndex={0}
            >
              {p}
            </div>
          ))}
          <AdminTESelector add={false} select={(d) => this.selectPredecessor(d)} />
        </div>
      </div>
    ) : null;
  }
}

export default AdminTESettings;
