
import { computed, observable } from 'mobx';
import BaseI18n from './BaseI18n';

export default class Intro extends BaseI18n {
  @observable data = {
    hello: {
      ru: 'Добро пожаловать в демо-версию мультимедийного атласа "Хронист", благодаря которому вы сами выбираете типы данных, которые хотите отобразить и сами настраиваете хронологию, которая вам интересна. Наша команда верит, что изучение истории становится очень занимательным, когда вы изучаете не один регион, а всю планету. История всего мира взаимосвязана и здесь вы сможете самостоятельно находить и изучать эти взаимосвязи.',
      en: 'Welcome to the Chronist interactive atlas where you can choose both the type of data and the timeline you are interested in. We believe that studying history becomes more efficient when focused on the whole world and not a certain area. Find your own correlation between events on a world scale.'
    },
    excuse: {
      ru: 'В демо версии вы найдёте лишь небольшую активную часть карты (она обозначена цветом) и отрезок времени, который сможете использовать. Мы планируем, что хронология будет начинаться от разделения материков и доходить до XXI века. В дальнейшем мы усложним интерфейс: добавим в хронологию этапы в зависимости от регионов, возможность ввода собственных данных и, таким образом, создания собственных курсов, экспорт данных в удобные форматы для создания интерактивной презентации при помощи пары кликов, и многое другое.',
      en: 'The map is not complete yet, however we update it every few months with new territories and historical data. The overall functionality also becomes more complicated.'
    },
    legend: {
      ru: 'Легенда находится на боковой панели, но вы также можете получить краткую справку по территориям и городам, просто кликнув на них.',
      en: 'The legend is on the upper-left, you also can see all the info by clicking on the territory.'
    },
    index: {
      ru: 'Следить за изменениями можно перемещая указатель по временной шкале как самостоятельно, так и при помощи кнопок управления.',
      en: 'Follow the events and changes by moving the index forward and backward.'
    },
    layers: {
      ru: 'Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.',
      en: 'There will be different layers of events like wars, expeditions, nations, religion etc. Now in demo you can only see borders, cities and inventions. By clicking on the invention you will see the city where the event happened. We will soon release such options as export, sort and add additional info for beta-testing.'
    },
    intro: {
      ru: 'Вы можете вернуться к интро, нажав "домой" на боковой панели.',
      en: 'You can always switch to intro again on the side panel.'
    }
  }

  @computed get carousel() {
    return [
      {
        key: '0',
        overlay: 'overlay-none',
        content: this.data.hello[this.lng]
      }, {
        key: '1',
        overlay: 'overlay-none',
        content: this.data.excuse[this.lng]
      }, {
        key: '2',
        overlay: 'overlay-legend',
        content: this.data.legend[this.lng]
      }, {
        key: '3',
        overlay: 'overlay-timeline',
        content: this.data.index[this.lng]
      }, {
        key: '4',
        overlay: 'overlay-feed',
        content: this.data.layers[this.lng]
      }, {
        key: '5',
        overlay: 'overlay-home',
        content: this.data.intro[this.lng]
      }
    ];
  }
}
