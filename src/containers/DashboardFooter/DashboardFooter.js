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
import { action, computed } from 'mobx';

import Button, { BUTTON_TYPE } from '../../components/Button/Button';
import './DashboardFooter.less';

@inject('store')
@observer
class DashboardFooter extends React.Component {
  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  @action openFeedback() {
    this.props.store.feedback.year = this.props.store.year.now;
    this.props.store.flags.runtime.set('feedback', true);
  }

  render() {
    return (
      <div className='dashboard-footer'>
        <Button
          btnType={BUTTON_TYPE.GHOST}
          onClick={() => console.log('news not available')}
        >
          {this.dashboard.news}
        </Button>
        <Button
          btnType={BUTTON_TYPE.GHOST}
          onClick={() => console.log('https://github.com/chronhq/frontend')}
        >
          {this.dashboard.about}
        </Button>
        <Button
          btnType={BUTTON_TYPE.GHOST}
          onClick={() => console.log('show license')}
        >
          {this.dashboard.license}
        </Button>
        <Button
          btnType={BUTTON_TYPE.GHOST}
          onClick={() => this.openFeedback()}
        >
          {this.dashboard.report}
        </Button>
      </div>
    );
  }
}

export default DashboardFooter;
