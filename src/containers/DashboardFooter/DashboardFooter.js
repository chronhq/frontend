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
import { computed } from 'mobx';
import { withRouter } from 'react-router-dom';


import './DashboardFooter.less';

@inject('store')
@observer
class DashboardFooter extends React.Component {
  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  link(url, name) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
      >
        {this.dashboard[name]}
      </a>
    );
  }

  render() {
    return (
      <div className='dashboard-footer'>
        {this.link('https://chronhq.github.io/wiki/', 'project')}
        <a
          href='/about'
          onClick={(e) => {
            e.preventDefault();
            this.props.history.push('/about');
            return false;
          }}
        >
          {this.dashboard.about}
        </a>
        {this.link('https://chronhq.github.io/wiki/project/licenses.html', 'license')}
        {this.link('https://github.com/chronhq/data/issues', 'report')}
      </div>
    );
  }
}

export default withRouter(DashboardFooter);
