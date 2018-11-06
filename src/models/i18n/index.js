import { observable, computed, action } from 'mobx';
import MessagesI18n from './MessagesI18n';
import AvailableLanguages from './translation/AvailableLanguages';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable messages = new MessagesI18n(this.rootStore);

  languages =
    Object.keys(AvailableLanguages)
      .reduce((prev, cur) => ({
        ...prev,
        [cur]: AvailableLanguages[cur].language
      }), {});

  @observable lng = 'ru';

  @action select(languages) {
    if (languages in this.languages) {
      this.lng = languages;
    }
  }

  @computed get data() {
    return AvailableLanguages[this.lng];
  }

  @computed get nameSelector() {
    return this.data.selectors.name;
  }
}
