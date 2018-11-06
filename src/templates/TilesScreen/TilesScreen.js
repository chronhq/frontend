import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Tile from '../../components/Tile/Tile';
import SetLocalizationToggle from '../../components/SetLocalizationToggle';
import './TilesScreen.less';

@inject('store')
@observer
class TilesScreen extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  render() {
    const { courses } = this.props;
    return (
      <div className='startpage__container parent'>
        <div className='startpage__langswitch'>
          <SetLocalizationToggle i18n={this.props.store.i18n} />
        </div>
        <div className='starpage__title'>
          <h3>
            {' '}
            {this.props.store.i18n.data.courseSelection.title}
            {' '}
          </h3>
        </div>
        <div className='tile__container'>
          <div className='hex-row'>
            {Object.keys(courses).map(c => (
              <Tile
                key={`courseSelector_id${c}`}
                course={courses[c]}
                lng={this.lng}
              />
            ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TilesScreen;
