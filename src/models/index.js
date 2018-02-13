import Bank from './BankModel';
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
    this.bank = new Bank(this);
    this.borders = new Borders(this);
    this.flags = new Flags();
    this.projection = new Projection();
    this.year = new Year();
  }
}
