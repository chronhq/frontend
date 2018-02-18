import React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import './MapClickInfo.less';

const LocationWidget = ({ location }) => (
  <div>
  Название: {location.nameRus}<br />
  Основан: {location.founded || 'Неизвестно'}<br />
  Население: {location.population || 'Неизвестно'}<br />
  (По последней переписи)
  </div>
);

const BordersWidget = ({
  border, type, disputed, admin
}) => (
  <div>
    Название: {border.nameru}<br />
    Тип: {type}<br />
    {disputed.length !== 0
      ? `Спор между: ${disputed.join(', ')}`
      : `Принадлежит: ${admin}`}
  </div>
);

@inject('store')
@observer
class MapClickInfo extends React.Component {
  @computed get widget() {
    if (this.props.store.clickInfo.selected !== null) {
      return this.props.store.clickInfo.widget.widgetType === true
        ? <BordersWidget {...this.props.store.clickInfo.widget} />
        : <LocationWidget {...this.props.store.clickInfo.widget} />;
    }
    // Widget is closed
    return 'Кликните на карту, чтобы получить информацию';
  }

  render() {
    if (this.props.store.clickInfo.isOpen === false) return '';
    return (
      <div id='mapClickInfo'>
        <div>
        Информация
          <button
            className='close'
            onClick={() => this.props.store.clickInfo.closeWidget()}
          >&times;
          </button>
        </div>

        <div>
          {this.widget}
        </div>
        <hr />
      </div>
    );
  }
}

export default MapClickInfo;
