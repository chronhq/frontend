import Data from './DataModel';
import Borders from './BordersModel';
import Flags from './FlagsModel';
import Projection from './ProjectionModel';
import Year from './YearModel';
import CourseSideEffects from './CourseSideEffects';
import ColorsModel from './ColorsModel';
import Locations from './LocationsModel';
import View from './ViewModel';

export default class storeModel {
  // Add here new models
  constructor() {
    this.data = new Data();
    this.projection = new Projection();
    this.flags = new Flags();
    this.year = new Year(this);
    this.effects = {
      course: new CourseSideEffects(this),
    };
    this.borders = new Borders(this);
    this.locations = new Locations(this);
    this.colors = new ColorsModel(this);
    this.view = new View(this);
  }
}
