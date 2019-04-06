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

import Button, { BUTTON_TYPE } from './Button';

const CloseButton = ({
  onClick = () => { console.log('CloseBtn cb'); },
  compact = false,
}) => (
  <Button
    btnType={compact ? BUTTON_TYPE.COMPACT : BUTTON_TYPE.CLOSE}
    onClick={onClick}
  >
    <span className="lnr lnr-cross" />
  </Button>
);

CloseButton.propTypes = {
  onClick: PropTypes.any.isRequired,
  compact: PropTypes.bool.isRequired,
};

export default CloseButton;
