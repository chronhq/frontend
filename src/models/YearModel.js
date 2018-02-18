import { observable, action } from 'mobx';

export default class YearModel {
  @observable min;
  @observable max;
  @observable now;
  @observable tick;
  @observable playing = false;
  @observable yearInterval = 1000;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

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
    this.rootStore.borders.loadGeometry();
  }

  nextYear() {
    this.setYear(this.now + 1);
  }

  prevYear() {
    this.setYear(this.now - 1);
  }

  resetYear() {
    this.setYear(this.min);
  }

  play() {
    if (this.playing === false) return;
    this.nextYear();
    setTimeout(() => this.play(), this.yearInterval);
  }

  @action togglePlay(playing = !this.playing) {
    this.playing = playing;
    this.play();
  }

}
