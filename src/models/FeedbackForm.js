import { observable, action, computed } from 'mobx';

export default class FeedbackForm {
  @computed get glyph() {
    return this.success ? 'lnr lnr-checkmark-circle' : 'lnr lnr-cross';
  }

  @computed get secret() {
    const pi = 314159;
    const ts = Math.floor(Date.now() / 1000);
    const arr = ts.toString().split('');
    const magic = arr.reduce((m, cur) => (Number(cur) === 0 ? m : m * cur), 1);
    const params = `p=${ts * pi}&m=${magic * this.text.length}`;
    return params;
  }

  @computed get body() {
    return [
      this.secret,
      'demo=1',
      `email=${this.email}`,
      `name=${encodeURI(this.name)}`,
      `text=${encodeURI(this.text)}`
    ].join('&');
  }

  @observable visible = false;

  @observable success = false;

  @observable name = '';

  @observable email = '';

  @observable text = '';

  @observable layer;

  @observable year;

  @action wipe() {
    this.email = '';
    this.name = '';
    this.text = '';
  }

  @action result(val) {
    this.visible = true;
    this.success = val;
  }

  @action submit() {
    const url = '/shared/contact.php';
    const req = {
      method: 'POST',
      credentials: 'same-origin',
      body: this.body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch(url, req).then(action((response) => {
      const success = response.status === 200;
      if (success) {
        this.wipe();
      }
      this.result(success);
      // this.visible = true;
      // this.success = success;
      // this.setState({ ...this.state, ...wipe, visibile: true, success });
      console.log('resp', response);
    }))
      .catch(action((error) => {
        this.result(false);
        // this.setState({ ...this.state, visibile: true, success: false });
        // this.success = false;
        // this.visible = true;
        console.log('err', error);
      }));
  }
}
