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
import { inject, observer } from 'mobx-react';

import FeedbackButtons from './FeedbackButtons';
import SetLocalization from './SetLocalization';

@inject('store')
@observer
class Settings extends React.Component {
  render() {
    return (
      <div className='sidepanel--content'>
        <h3>
          {this.props.store.i18n.data.settings.title}
        </h3>
        <SetLocalization i18n={this.props.store.i18n} />
        <FeedbackButtons onClose={this.props.onClose} />
      </div>
    );
  }
}

export default Settings;
