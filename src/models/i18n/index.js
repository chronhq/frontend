import { observable, computed, action } from 'mobx';
import MessagesI18n from './MessagesI18n';
import IntroI18n from './IntroI18n';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable messages = new MessagesI18n(this.rootStore);

  @observable intro = new IntroI18n(this.rootStore);

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
    switch (this.lng) {
      case 'en': return 'Chronist, interactive atlas';
      default: return 'Хронист, интерактивный атлас';
    }
  }

  @computed get buttons() {
    switch (this.lng) {
      case 'en':
        return {
          apply: 'Apply',
          close: 'Close',
          faq: 'FAQ',
          next: 'Next',
          mistake: 'Found a mistake',
          send: 'Send',
          export: 'Save to txt',
        };
      default:
        return {
          apply: 'Применить',
          close: 'Закрыть',
          faq: 'FAQ',
          mistake: 'Сообщить об ошибке',
          next: 'Далее',
          send: 'Отправить',
          export: 'Экспорт в txt',
        };
    }
  }

  @computed get tooltips() {
    switch (this.lng) {
      case 'en':
        return {
          intro: 'Intro',
          search: 'Search',
          feed: 'Feed',
          settings: 'Settings',
          debug: 'Debug',
          author: 'About author',
          home: 'Course selection',
          nextYear: 'Next year',
          prevYear: 'Previous year',
          collapse: 'Collapse',
          expand: 'Expand',
        };
      default:
        return {
          intro: 'Интро',
          search: 'Поиск',
          feed: 'Лента событий',
          settings: 'Настройки',
          debug: 'Отладка',
          author: 'Информация об авторе',
          home: 'К выбору курса',
          nextYear: 'Следующий год',
          prevYear: 'Предыдущий год',
          collapse: 'Свернуть',
          expand: 'Развернуть',
        };
    }
  }
}
