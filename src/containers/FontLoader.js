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

@inject('store')
@observer
class FontLoader extends React.Component {
  render() {
    const fonts = Object.keys(this.props.store.prepared.decor.mapLabels.fonts);
    const display = this.props.store.courseSelection.loadingIsComplete === true
      ? 'none' : 'inline';
    return (
      <div style={{ display, visibility: 'hidden' }}>
        {fonts.map(font => (
          <p key={font} style={{ fontFamily: font }}>
            {font}
          </p>
        ))}
      </div>
    );
  }
}

export default FontLoader;
