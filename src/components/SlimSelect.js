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
import Select from 'react-select';

const styles = width => ({
  container: c => ({ ...c, width }),
  valueContainer: c => ({ ...c, padding: '0px 4px' }),
  input: c => ({
    ...c, paddingBottom: 0, paddingTop: 0, margin: 0
  }),
  dropdownIndicator: c => ({ ...c, padding: 0 }),
});

const SlimSelect = (props) => {
  const { containerWidth } = props;
  return (
    <Select
      styles={styles(containerWidth)}
      {...props}
    />
  );
};

SlimSelect.defaultProps = {
  containerWidth: '7rem'
};

export default SlimSelect;
