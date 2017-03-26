import React from 'react';
import 'font-awesome/less/font-awesome.less';

import SetProjectionContainer from '../containers/SetProjectionContainer';
import SetLayerVisibility from '../containers/SetLayerVisibility';
import Feed from '../containers/Feed';
import Legend from '../containers/Legend';
import RotatingLogo from './RotatingLogo';
import Modal from './Modal';
import Intro from './Intro';

import './SidePanel.less';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      current: 0,
      style: { float: 'right' },
      isSurveyOn: false,
      isIntroOn: true,
    };
  }

  toggle = (id) => {
    { /*
      console.log(`this is id ${id}`);
      console.log(`this is current ${this.state.current} and isopen is ${this.state.isOpen}`);
    */ }
    const isOpen = !(this.state.current === id && this.state.isOpen === true);
    this.setState({ ...this.state, isOpen, current: id });
  }

   toggleSurvey = () => {
    this.setState({ isSurveyOn: !this.state.isSurveyOn });
  }

  toggleIntro = () => {
    this.setState({ isIntroOn: !this.state.isIntroOn });
  }


  render() {

    const onTopStyle = {'z-index': 1000,}
    return (
      <div>
        <div className="icon-bar" style={this.onTopStyle}>
          <button id="Sidebar1" onClick={() => this.toggle(1)} > <i className="fa fa-home fa-fw" /></button>
          <button onClick={() => this.toggle(2)}><i className="fa fa-search fa-fw" /></button>
          <button onClick={() => this.toggle(3)}><i className="fa fa-list-ul fa-fw" /></button>
          <button onClick={() => this.toggle(4)}><i className="fa fa-globe fa-fw" /></button>
          <button onClick={() => this.toggle(5)}><i className="fa fa-cog fa-fw" /></button>
          <button onClick={() => this.toggleSurvey()}><i className="fa fa fa-question fa-fw" /></button>
        </div>

        <Modal isOpen={this.state.isSurveyOn} onClose={() => this.toggleSurvey()} />
        <Intro isOpen={this.state.isIntroOn} onClose={() => this.toggleIntro()} />

        {this.state.isOpen ?
          <div className="sidenav">
            {this.state.current === 1
              ? <div>
                <p>«Хронист» - это мультимедийный атлас, благодаря которому вы сами выбираете типы данных, которые нужно отобразить, и          сами настраиваете хронологию, которая вам интересна. Мы хотим показать, что изучение истории становится очень         занимательным, когда вы изучаете не один регион, а всю планету. Что история всего мира взаимосвязана и вы можете          самостоятельно находить и изучать эти взаимосвязи.</p>
          <p>В демо версии вы найдёте лишь небольшую активную часть карты (она обозначена цветом) и отрезок времени, который          сможете использовать. Мы постоянно работаем над расширением нашей базы и в сентябре откроем карту целиком (вы всегда          можете проследить сколько данных мы добавили, счётчик есть на главной странице).</p>
          <p>Мы планируем, что хронология будет начинаться от разделения материков и доходить до XXI века. В дальнейшем мы усложним           интерфейс: добавим в хронологию этапы в зависимости от регионов, возможность ввода собственных данных и, таким образом,           создания собственных курсов, экспорт данных в удобные форматы для создания интерактивной презентации при помощи пары          кликов, и многое другое. </p>
          <p>Мы также работаем над добавлением «слоёв». Слой - это набор данных определённого типа - население, стихийные бедствия, религиозные направления, политическое устройство и тд. Сейчас мы предлагаем всего два слоя: города и политические границы. Слой «изобретения» по умолчанию включен и отображается как лента событий. При наведении курсора на событие оно отмечается в городе, в котором произошло. Изобретения также можно выделить щелчком и экспортировать в текстовый формат. В скором времени «изобретения» переместятся в другую вкладку, их можно будет отключать и накладывать на другие слои. В таком случае, вероятно, некоторые явления приобретут причинно-следственную связь. Их также можно будет сортировать, экспортировать в различном варианте и переходить к полной версии со ссылками на научные материалы.</p>
              </div>
              : null }
            {this.state.current === 2
              ? <div className='search'>
                <h3> Поиск </h3>
                <RotatingLogo />
              </div>
              : null }
            {this.state.current === 3 ? <Feed /> : null }
            {this.state.current === 4 ? <Legend /> : null }
            {this.state.current === 5
              ? <div className='projectionSettings'>
                <h3> Настройка проекции </h3>
                <SetProjectionContainer />
                <hr />
                <SetLayerVisibility />
              </div>
              : null }
          </div> : null
       }
      </div>
    );
  }
}

export default SidePanel;
