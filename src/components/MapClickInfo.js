import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setClickInfo } from '../reducers/status';

import './MapClickInfo.less';

const LocationWidget = ({ location }) => (
  <div>
  Название: {location.name_rus}<br />
  Основан: {location.founded || 'Неизвестно'}<br />
  Население: {location.population || 'Неизвестно'}<br />
  (По последней переписи)
  </div>
);

const BordersWidget = ({ border, type, disputed, admin }) => (
  <div>
    Название: {border.nameru}<br />
    Тип: {type}<br />
    {disputed.length !== 0
    ? `Спор между: ${disputed.join(', ')}`
    : `Принадлежит: ${admin}`}
  </div>
);

class MapClickInfo extends Component {
  drawWidget() {
    switch(this.props.widgetType) {
      case 'location': {
        return <LocationWidget location={this.props.locations[this.props.selected]} />
      }
      case 'border': {
        const border = this.props.properties[this.props.selected];
        const disputed = border.disputed !== ''
          ? border.disputed.split(';').map(mapColor => { // map over mapcolor13 of admin
              // console.log('disputed', border.disputed, mapColor);
              return Object.keys(this.props.properties).reduce((prev, propId) => {
                // console.log(prev, this.props.properties[propId].disputed === "",
                // Number(this.props.properties[propId].mapcolor13) === Number(mapColor),
                // this.props.properties[propId].admin
                // );
                if (prev === '?') {
                  if (this.props.properties[propId].disputed === ""
                    && Number(this.props.properties[propId].mapcolor13) === Number(mapColor)) {
                      const id = this.props.properties[propId].admin;
                      // console.log('returning', this.props.admin[id].ru);
                      return this.props.admin[id].ru;
                    }
                }
                return prev;
              },'?')
            })
          : [];
        const admin = this.props.admin[border.admin].ru;
        
        return <BordersWidget 
          border={border}
          type={this.props.type[border.type].ru}
          disputed={disputed}
          admin={admin}
          />
      }
      default:
        return 'Кликните на карту, чтобы получить информацию';
    }
  }

  render() {
    return (
      <div>
      {this.props.selected &&
      <div id='mapClickInfo'>
        <div className='mapClickInfo-header'>
          Информация
          <button
            className='close'
            onClick={() => this.props.setClickInfo('location', null)}
          >&times;</button>
        </div>
          
        <div>
          {this.drawWidget()}
        </div>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.status.clickInfo,
    widgetType: state.status.clickInfoType,
    persons: state.persons.byId,
    locations: state.locations.places,
    properties: state.properties.data.properties,
    admin: state.properties.admin.admin,
    type: state.properties.type.type
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setClickInfo: bindActionCreators(setClickInfo, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapClickInfo);

