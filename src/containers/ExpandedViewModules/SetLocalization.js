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
// import { inject, observer } from 'mobx-react';
// import { action } from 'mobx';
import ym from 'react-yandex-metrika';
import { InputRadio } from '../../components/Input';


class SetLocalization extends React.Component {
  get languages() {
    return Object.keys(this.props.i18n.languages).map(cur => ({
      key: cur,
      value: cur,
      checked: this.props.i18n.lng === cur,
      label: this.props.i18n.languages[cur],
      onChange: () => this.handleOptionChange(cur)
    }));
  }

  handleOptionChange = (lng) => {
    this.props.i18n.select(lng);
    ym('reachGoal', 'locale', lng);
  }

  render() {
    return (
      <div className='layerControl'>
        <h5>
          {this.props.i18n.data.settings.language}
        </h5>
        <form>
          {this.languages.map(lng => <InputRadio {...lng} />)}
        </form>
      </div>
    );
  }
}

export default SetLocalization;
