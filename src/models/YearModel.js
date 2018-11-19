import { observable, action } from 'mobx';

export default class YearModel {
  @observable min;

  @observable max;

  @observable now;

  @observable prev;

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
    this.prev = year.now;
    this.tick = year.tick;
  }

  @action setYear(year) {
    this.prev = this.now;
    this.now = (year > this.max || year < this.min)
      ? this.min
      : year;
    // this.rootStore.borders.loadGeometry();
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

  @action setTick(tick) {
    if (tick in this.rootStore.data.CourseTimelines.data) {
      this.setYear(this.rootStore.data.CourseTimelines.data[tick].year);
      this.tick = tick;
      // Timeline hack: active event on center
      if (this.rootStore.flags.flags.UI.MiniSidebar === true) {
        const selectedNode = document.getElementsByClassName('timeline__entry--selected');
        const containerNode = document.getElementsByClassName('event__container');
        containerNode[0].scrollTop = selectedNode[0].offsetTop - 222; // HARDCODE
      }
    }
  }

  nextTick() {
    this.setTick(this.tick + 1);
  }

  prevTick() {
    this.setTick(this.tick - 1);
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
