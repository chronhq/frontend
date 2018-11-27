import { observable } from 'mobx';

import Data from './DataModel';
import Borders from './BordersModel';
import Flags from './FlagsModel';
import Projection from './ProjectionModel';
import Year from './YearModel';
import CourseSideEffects from './CourseSideEffects';
import Prepared from './PreparedData';

import FeedbackForm from './FeedbackForm';

import PinsModel from './PinsModel';
import Internationalization from './i18n';
import DeckViewport from './DeckViewport';
import AnimationFrame from './AnimationFrame';
import Properties from './PropertiesModel';

import MapStyle from './MapStyleModel';

export default class storeModel {
  @observable fonts = {};

  // Add here new models
  constructor() {
    this.feedback = new FeedbackForm();
    this.data = new Data();
    this.flags = new Flags();
    this.animation = new AnimationFrame();
    this.projection = new Projection(this);
    this.deck = new DeckViewport(this);
    this.year = new Year(this);
    this.effects = {
      course: new CourseSideEffects(this),
    };
    this.borders = new Borders(this);
    this.properties = new Properties(this);
    this.prepared = new Prepared(this);
    this.pins = new PinsModel(this);
    this.i18n = new Internationalization(this);
    this.mapStyle = new MapStyle(this);
  }
}
