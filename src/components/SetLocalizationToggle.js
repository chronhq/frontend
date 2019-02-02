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
import Button, { BUTTON_TYPE } from './Button/Button';

class SetLocalizationToggle extends React.Component {
  get next() {
    return (this.props.i18n.lng === 'en')
      ? {
        key: 'ru',
        text: this.props.i18n.languages.ru,
      }
      : {
        key: 'en',
        text: this.props.i18n.languages.en,
      };
  }

  toggleLanguage = () => {
    this.props.i18n.select(this.next.key);
  }

  render() {
    return (
      <Button btnType={BUTTON_TYPE.GHOST} onClick={this.toggleLanguage}>
        {this.next.text}
      </Button>
    );
  }
}

export default SetLocalizationToggle;
