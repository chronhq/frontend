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
import { inject, observer } from 'mobx-react';
import SmoothCollapse from 'react-smooth-collapse';

import AdminWrapper from '../../components/AdminWrapper/AdminWrapper';
import AdminTEAction from '../../components/AdminTEAction/AdminTEAction';
import ActionButton, { CreateActionButton } from '../../components/ActionButtons/ActionButtons';

import './EditPRS.less';

const genDate = () => (new Date(+(new Date()) - Math.floor(Math.random() * 10000000000000)));


const Entities = ({ title, click, expanded }) => {
  const count = Math.round(Math.random() * 10);
  const dates = new Array(count * 2).fill(0).map(genDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const data = new Array(count).fill(0).map((v, i) => {
    const end = dates[i * 2];
    const start = dates[i * 2 + 1];
    return { start, end };
  });

  let icon = 'group';
  if (title !== 'Group') {
    icon += title === 'Direct' ? '-direct' : '-indirect';
  }

  return (
    <div>
      <ActionButton icon={icon} text={title} click={click} />
      <SmoothCollapse expanded={expanded}>
        <div className='prs-container'>
          {data.map(d => <AdminTEAction label='Test TE Label' {...d} />)}
        </div>
        <CreateActionButton text='Add' click={() => null} />
      </SmoothCollapse>
    </div>
  );
};

@inject('store')
@observer
class EditPRS extends React.Component {
  state = {
    direct: false,
    indirect: false,
    group: false,
  }

  click = d => this.setState(s => ({ [d]: !s[d] }))

  render() {
    return (
      <AdminWrapper title='Relations'>
        <Entities title='Direct' expanded={this.state.direct} click={() => this.click('direct')} />
        <Entities title='Indirect' expanded={this.state.indirect} click={() => this.click('indirect')} />
        <Entities title='Group' expanded={this.state.group} click={() => this.click('group')} />
      </AdminWrapper>
    );
  }
}

export default EditPRS;
