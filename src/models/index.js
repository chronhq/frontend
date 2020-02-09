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
import { observable } from 'mobx';

import Data from './DataModel';
import Flags from './FlagsModel';
import Year from './YearModel';
import CourseSelection from './CourseSelection';

import PinsModel from './PinsModel';
import BalloonModel from './BalloonModel';
import Internationalization from './i18n';
import DeckViewport from './DeckViewport';
import AnalyticModel from './AnalyticModel';

import MapStyle from './MVTStyles/MapStyleModel';
import Dashboard from './DashboardModel';
import DashboardSearch from './Search/DashboardSearch';
import AuthModel from './AuthModel';
import Wikidata from './Wikidata/Wikidata';
import OverlayModel from './OverlayModel';
import AdminModel from './Admin/AdminModel';

export default class storeModel {
  @observable fonts = {};

  // Add here new models
  constructor() {
    this.flags = new Flags();
    this.data = new Data();
    this.dashboard = new Dashboard(this);
    this.deck = new DeckViewport(this);
    this.year = new Year(this);
    this.courseSelection = new CourseSelection(this);
    this.pins = new PinsModel(this);
    this.balloon = new BalloonModel(this);
    this.i18n = new Internationalization(this);
    this.mapStyle = new MapStyle(this);
    this.search = new DashboardSearch(this);
    this.wikidata = new Wikidata(this);
    this.admin = new AdminModel(this);
    this.analytics = new AnalyticModel();
    this.auth = new AuthModel();
    this.overlays = new OverlayModel();
    this.remToPixel = (rem) => rem * parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
  }
}
