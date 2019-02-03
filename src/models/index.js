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
import Projection from './ProjectionModel';
import Year from './YearModel';
import CourseSelection from './CourseSelection';
import Prepared from './PreparedData';

import FeedbackForm from './FeedbackForm';

import PinsModel from './PinsModel';
import Internationalization from './i18n';
import DeckViewport from './DeckViewport';
import AnimationFrame from './AnimationFrame';

import MapStyle from './MapStyleModel';
import WikidataFetcher from './Wikidata/WikidataFetcher';
import WikidataStore from './Wikidata/WikidataStore';
import Dashboard from './DashboardModel';
import DashboardSearch from './Search/DashboardSearch';

import SpaceTimeVolume from './SpaceTimeVolumes/SpaceTimeVolumesContainer';
import AtomicBorders from './AtomicBordersModel';

export default class storeModel {
  @observable fonts = {};

  // Add here new models
  constructor() {
    this.feedback = new FeedbackForm();
    this.flags = new Flags();
    this.animation = new AnimationFrame();
    this.data = new Data(this);
    this.dashboard = new Dashboard(this);
    this.projection = new Projection(this);
    this.deck = new DeckViewport(this);
    this.year = new Year(this);
    this.wikidata = new WikidataFetcher(this);
    this.wikistore = new WikidataStore(this);
    this.courseSelection = new CourseSelection(this);
    this.atomicBorders = new AtomicBorders(this);
    this.spaceTimeVolume = new SpaceTimeVolume(this);
    this.prepared = new Prepared(this);
    this.pins = new PinsModel(this);
    this.i18n = new Internationalization(this);
    this.mapStyle = new MapStyle(this);
    this.search = new DashboardSearch(this);
  }
}
