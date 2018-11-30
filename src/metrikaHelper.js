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
import ym from 'react-yandex-metrika';

// Yandex Metrika id
export const YmId = (process.env.NODE_ENV === 'production')
  ? [42857239, 42866674] // <- Alice id, Padavan id
  : [42866674]; // <- Padavan id

export function ymHit(link) {
  setTimeout(() => {
    try {
      ym('hit', link);
    } catch (e) {
      console.error('YM Metrika error', e);
      ymHit(link);
    }
  }, 1000);
}
