/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { GiantActionButtonFillText } from '../ActionButtons/ActionButtons';

import './AdminAdvice.less';

class AdminAdvice extends React.Component {
  render() {
    return (
      <div className='admin-advice'>
        {this.props.text && (
          <div className='admin-stv-card-main__font'>
            TIP:
            {' '}
            {this.props.text}
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

const AdminAdviceButton = ({
  click, text, button, icon
}) => (
  <AdminAdvice text={text}>
    <GiantActionButtonFillText
      text={button}
      icon={icon}
      size='2rem'
      click={click}
    />
  </AdminAdvice>
);

export { AdminAdviceButton };
export default AdminAdvice;
