#!/bin/bash
#
# Chron.
# Copyright (c) 2022 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
# Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
# -----
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# -----
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# -----
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
set -e

ERR=""

if [[ "${FLAGS_CONFIG_BASE64}" == "" ]]; then
  FLAGS_CONFIG_BASE64=$(echo {} | base64)
fi

if [[ "${ANALYTICS_CONFIG_BASE64}" == "" ]]; then
  ANALYTICS_CONFIG_BASE64=$(echo '{ "ym": "", "ga": "" }' | base64)
fi

if [[ "${MAPBOX_CONFIG_BASE64}" == "" ]]; then
  echo "ERROR: MAPBOX_CONFIG_BASE64 option is not set"
  ERR=1
fi

if [[ "${FIREBASE_CONFIG_BASE64}" == "" ]]; then
  echo "ERROR: FIREBASE_CONFIG_BASE64 option is not set"
  ERR=1
fi

if [[ "${ERR}" != "" ]]; then
  exit 1
fi

echo ${FLAGS_CONFIG_BASE64} | base64 -d > ${HTML_FOLDER}/disabled-config.json
echo ${ANALYTICS_CONFIG_BASE64} | base64 -d > ${HTML_FOLDER}/analytics-config.json
echo ${MAPBOX_CONFIG_BASE64} | base64 -d > ${HTML_FOLDER}/mapbox-config.json
echo ${FIREBASE_CONFIG_BASE64} | base64 -d > ${HTML_FOLDER}/firebase-config.json