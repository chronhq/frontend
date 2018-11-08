import { observable, computed, action } from 'mobx';
import MessagesI18n from './MessagesI18n';
import AvailableLanguages from './translation/AvailableLanguages';

import logoRu from '../../img/logo-grey-ru.svg';
import logoEn from '../../img/logo-grey-en.svg';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable messages = new MessagesI18n(this.rootStore);

  @observable languages =
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

  @computed get logo() {
    return this.lng === 'ru' ? logoRu : logoEn;
  }

  @computed get nameSelector() {
    return this.data.selectors.name;
  }
}
