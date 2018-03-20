import { observable, computed, action } from 'mobx';
import MessagesI18n from './MessagesI18n';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable messages = new MessagesI18n(this.rootStore);
  @observable languages = {
    ru: 'Русский',
    en: 'English',
  }
  @observable lng = 'ru';
  @action select(languages) {
    if (languages in this.languages) {
      this.lng = languages;
    }
  }

  @computed get nameSelector() {
    switch (this.lng) {
      case 'en': return 'nameEng';
      default: return 'nameRus';
    }
  }

  @computed get title() {
    return this.lng === 'ru'
      ? 'Хронист, интерактивный атлас'
      : 'Chronist, interactive atlas';
  }
}
