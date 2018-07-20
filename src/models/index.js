import Data from './DataModel';
import Borders from './BordersModel';
import Flags from './FlagsModel';
import Projection from './ProjectionModel';
import Year from './YearModel';
import CourseSideEffects from './CourseSideEffects';
// import ColorsModel from './ColorsModel';
import Prepared from './PreparedData';
import View from './ViewModel';
import ClickInfo from './ClickInfoModel';
import FeedbackForm from './FeedbackForm';
import FeedModel from './FeedModel';
import FeedPinsModel from './FeedPinsModel';
import Internationalization from './i18n';
import DeckViewport from './DeckViewport';
import AnimationFrame from './AnimationFrame';

export default class storeModel {
  // Add here new models
  constructor() {
    this.feedback = new FeedbackForm();
    this.data = new Data();
    this.projection = new Projection();
    this.flags = new Flags();
    this.deck = new DeckViewport();
    this.animation = new AnimationFrame();

    this.year = new Year(this);
    this.effects = {
      course: new CourseSideEffects(this),
    };
    this.borders = new Borders(this);
    this.prepared = new Prepared(this);
    // this.colors = new ColorsModel(this);
    this.view = new View(this);
    this.clickInfo = new ClickInfo(this);
    this.feed = new FeedModel(this);
    this.pins = new FeedPinsModel(this);
    this.i18n = new Internationalization(this);
  }
}
