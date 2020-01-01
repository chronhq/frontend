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
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Button, { BUTTON_TYPE } from '../Button/Button';
import LogoutButton from './LogoutButton';

import './AdminWrapper.less';

@inject('store')
@observer
class AdminHeader extends React.Component {
  get backButton() {
    return this.props.back === undefined
      ? null
      : (
        <Button
          btnType={BUTTON_TYPE.ICON}
          onClick={() => this.props.store.admin.nextScreen(this.props.back)}
        >
          <div
            className='icon icon__shadow--hard icon-double-arrow-left--light'
            style={{ width: '2rem', height: '2rem' }}
          />
        </Button>
      );
  }

  render() {
    const { title } = this.props;
    return (
      <div className={`admin__header ${this.backButton ? 'admin__header--grid' : ''}`}>
        {this.backButton}
        <div className='admin__title'>
          {title}
        </div>
      </div>
    );
  }
}

const AdminWrapper = ({ title, children, back }) => (
  <div className='admin__container'>
    <div className='admin__content'>
      <AdminHeader title={title} back={back} />
      {children}
    </div>
    <LogoutButton />
  </div>
);

AdminWrapper.defaultProps = {
  back: undefined
};

AdminWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  back: PropTypes.string,
};

export default AdminWrapper;
