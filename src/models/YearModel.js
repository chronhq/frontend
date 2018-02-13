import { observable, action } from 'mobx';

export default class YearModel {
  @observable min;
  @observable max;
  @observable now;
  @observable tick;

  @action setup(year) {
    this.min = year.min;
    this.max = year.max;
    this.now = year.now;
    this.tick = year.tick;
  }

  @action setYear(year) {
    this.now = (year > this.max || year < this.min)
      ? this.min
      : year;
  }
  @action nextYear() {
    this.setYear(this.now + 1);
  }
  @action prevYear() {
    this.setYear(this.now - 1);
  }
  @action resetYear() {
    this.setYear(this.min);
  }
}
