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
  license ='https://chronhq.github.io/wiki/project/licenses.html'

  wiki = 'https://chronhq.github.io/wiki/'

  report = 'https://github.com/chronhq/data/issues'

  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  goToAbout = (e) => {
    e.preventDefault();
    this.props.history.push('/about');
    return false;
  }

  metricHit = (link) => {
    this.props.store.analytics.metricHit(link);
    return true;
  }

  link(url, name, click = () => true) {
    return (
      <a
        href={url}
        target='_blank'
        rel='noopener noreferrer'
        onClick={click}
      >
        {this.dashboard[name]}
      </a>
    );
  }

  render() {
    return (
      <div className='dashboard-footer'>
        {this.link(this.wiki, 'wiki')}
        {this.link('/about', 'about', this.goToAbout)}
        {this.link(this.license, 'license', () => this.metricHit('goto_github'))}
        {this.link(this.report, 'report')}
      </div>
    );
  }
}

export default withRouter(DashboardFooter);
