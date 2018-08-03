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
          back: 'Go to main screen',
          intro: 'Intro',
          search: 'Search',
          feed: 'Feed',
          settings: 'Settings',
          layers: 'Layers',
          debug: 'Debug',
          author: 'About author',
          home: 'Course selection',
          nextYear: 'Next year',
          prevYear: 'Previous year',
          collapse: 'Collapse',
          expand: 'Expand',
          soon: 'Not available yet'
        };
      default:
        return {
          back: 'Вернутся в основное меню',
          intro: 'Интро',
          search: 'Поиск',
          feed: 'Лента событий',
          settings: 'Настройки',
          layers: 'Слои',
          debug: 'Отладка',
          author: 'Информация об авторе',
          home: 'К выбору курса',
          nextYear: 'Следующий год',
          prevYear: 'Предыдущий год',
          collapse: 'Свернуть',
          expand: 'Развернуть',
          soon: 'Скоро'
        };
    }
  }

  @computed get feedback() {
    switch (this.lng) {
      case 'en':
        return {
          title: "There's a mistake!",
          subtitle: 'Data accuracy is our priority. We greatly appreciate any submitted reports.',
          name: 'Name',
          email: 'email',
          year: 'Year',
          layer: 'Layer',
          desc: 'Description',
          ref: 'Reference',
          layers: ['Select layer:', 'Borders', 'Inventions', 'Wars', 'Events'],
          ToS: 'I agree to the Privacy Policy',
          button: 'Bug report'
        };
      default:
        return {
          title: 'Здесь ошибка',
          subtitle: 'Точность данных наш приоритет.  Благодарим за все найденные и указанные ошибки.',
          name: 'Имя',
          email: 'email',
          year: 'Год',
          layer: 'Тип данных',
          desc: 'Комментарий',
          ref: 'Ссылка на источник',
          layers: ['Тип данных:', 'Borders', 'Inventions', 'Wars', 'Events'],
          ToS: 'Я принимаю условия пользовательского соглашения',
          button: 'Сообщить'
        };
    }
  }

  @computed get layerNames() {
    switch (this.lng) {
      case 'en':
        return {
          title: 'Layers',
          borders: 'State Borders',
          labels: 'Map Labels',
          mapDecorations: 'Map Decorations',
          cities: 'Cities',
          traces: 'Expeditions',
          inventions: 'Inventions',
          persons: 'Persons',
          geoEvents: 'Events',
        };
      default:
        return {
          title: 'Управление слоями',
          borders: 'Политические границы',
          labels: 'Подписи',
          mapDecorations: 'Декорации',
          cities: 'Города',
          traces: 'Экспедиции',
          inventions: 'Изобретения',
          persons: 'Персоны',
          geoEvents: 'События',
        };
    }
  }
}
