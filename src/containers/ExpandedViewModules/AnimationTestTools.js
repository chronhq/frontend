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
import { observer, inject } from 'mobx-react';

import TimeControls from '../TimeControls/TimeControls';
import AlignToggler from '../../components/AlignToggler';
import { InputCheckBox } from '../../components/Input';

@inject('store')
@observer
class Animation extends React.Component {
  handleChange() {
    this.props.store.flags.runtime.toggle('animation');
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justfyContent: 'space-between' }}>
          <button onClick={() => this.props.store.animation.startAnimation()} type='button'>
            {'Start Animation'}
          </button>
          <button onClick={() => this.props.store.animation.stopAnimation()} type='button'>
            {'Stop Animation'}
          </button>
          <button onClick={() => this.props.store.animation.resetAnimation()} type='button'>

            {'Reset Animation'}
          </button>
        </div>
        <p>
          {'Time:'}
          {this.props.store.animation.time}
        </p>
        <InputCheckBox
          name='animation'
          label='Animation'
          checked={this.props.store.flags.runtime.get('animation')}
          cb={() => this.handleChange()}
        />
      </div>
    );
  }
}

const AnimationTestTools = () => (
  <div className='sidepanel--content'>
    <h3>AnimationTestTools</h3>
    <AlignToggler />
    <TimeControls />
    <Animation />
  </div>
);

export default AnimationTestTools;
