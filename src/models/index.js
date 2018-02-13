import Data from './DataModel';
import Borders from './BordersModel';
import Flags from './FlagsModel';
import Projection from './ProjectionModel';
import Year from './YearModel';

export default class storeModel {
  constructor() {
    // Add here new models
    this.app = {
      name: 'beta chronist',
    };
    this.data = new Data(this);
    this.borders = new Borders(this);
    this.flags = new Flags();
    this.projection = new Projection();
    this.year = new Year();
  }
}
