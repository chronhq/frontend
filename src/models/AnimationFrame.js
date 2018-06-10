import { observable } from 'mobx';

export default class AnimationFrameModel {
  @observable time = 0;
  fps = 10;
  loopLength = 50;
  loopTime = 5000;
  running = false

  step() {
    if (this.running) {
      setTimeout(() => {
        this.time = (Date.now() % this.loopTime) / this.loopTime;
        window.requestAnimationFrame(() => this.step());
      }, 1000 / this.fps);
    }
  }
  startAnimation() {
    this.running = true;
    window.requestAnimationFrame(() => this.step());
  }
  stopAnimation() {
    this.running = false;
  }
  resetAnimation() {
    this.stopAnimation();
    this.time = 0;
  }
}
