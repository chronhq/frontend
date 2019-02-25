/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, observable, action } from 'mobx';
import Button, { BUTTON_TYPE } from '../../components/Button/Button';

import {
  Sources,
  PersonFact,
  Battle,
  Document
} from '../../components/Messages';
import CountryHover from '../../components/Messages/CountryHover';

import './Balloon.less';

@inject('store')
@observer
class Balloon extends React.Component {
  @observable positionClassNameCache = '';

  @observable mouseX = 0;

  @observable mouseY = 0;

  @computed get pin() {
    return this.props.store.balloon.selected;
  }

  @computed get pinned() {
    return this.props.store.balloon.pinned;
  }

  @computed get countryHover() {
    return this.props.store.balloon.countryHover;
  }

  @computed get opacity() {
    if (this.countryHover === false) {
      return (this.pin === null || this.pin === undefined || this.pin.info.length === 0)
        ? 0 : 1;
    }
    return 1;
  }


  @computed get style() {
    return {
      opacity: this.opacity,
      visibility: this.opacity ? 'visible' : 'hidden',
      top: `${this.props.store.balloon.pageY}px`,
      left: `${this.props.store.balloon.pageX}px`,
    };
  }

  @computed get positionClassName() {
    if (this.props.store.balloon.pinned) return this.positionClassNameCache;
    if (this.props.store.balloon.pageX > 0.5 * window.innerWidth) {
      if (this.props.store.balloon.pageY < 0.7 * window.innerHeight) {
        return 'balloonTopRight';
      }
      return 'balloonBottomRight';
    } if (this.props.store.balloon.pageY < 0.7 * window.innerHeight) {
      return 'balloonTopLeft';
    }
    return 'balloonBottomLeft';
  }

  @computed get i18n() {
    return this.props.store.i18n.messages;
  }

  @computed get news() {
    if (this.pin === null || this.pin === undefined) return [];
    return this.pin.info.map((pin) => {
      switch (pin.type) {
        case 'countryHover':
          return {
            id: 'countryHoverBaloon',
            message: <CountryHover id={this.pin.info[0].data} />,
            sources: <Sources id={this.pin.info[0].data} type={this.pin.info[0].type} />
          };
        case 'death':
        case 'birth':
        // actor from wikidata
          return {
            id: `personHoverBalloon_${pin.person.id}`,
            message: (
              <PersonFact
                person={pin.person}
                key={`balloon_person_${pin.type}_${pin.person.id}`}
              />
            ),
            sources: <Sources id={pin.person.id} pin={pin.person} type={pin.type} />
          };
        case 'battle':
          return {
            id: `battleHoverBalloon_${pin.battle.id}`,
            message: (
              <Battle
                fact={pin.battle}
                key={`balloon_battle_${pin.type}_${pin.battle.id}`}
              />
            ),
            sources: <Sources id={pin.battle.id} pin={pin.battle} type={pin.type} />
          };
        case 'document':
          return {
            id: `documentHoverBalloon_${pin.document.id}`,
            message: (
              <Document
                fact={pin.document}
                key={`balloon_document_${pin.type}_${pin.document.id}`}
              />
            ),
            sources: <Sources id={pin.document.id} pin={pin.document} type={pin.type} />
          };
        default:
          return { message: () => '', sources: () => '', id: 'defaultBalloonId' };
      }
    });
  }

  @action setMousePosition(e) {
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }

  mouseDragDown = (e) => {
    this.positionClassNameCache = this.positionClassName;
    this.setMousePosition(e);
    this.props.store.balloon.dragClick(true);
  }

  mouseDrag = (e) => {
    e.preventDefault();
    if (this.props.store.balloon.dragOn) {
      this.props.store.balloon.setPosition(
        this.props.store.balloon.pageX - (this.mouseX - e.pageX),
        this.props.store.balloon.pageY - (this.mouseY - e.pageY)
      );
      this.setMousePosition(e);
    }
  }

  render() {
    const container = `balloonContainer ${this.positionClassName}`;
    const news = 'balloonNews balloonMain';
    const sources = 'balloonNews balloonSources';
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div style={{ ...this.style }} className={container}>
        {this.props.store.balloon.pinned
          && (
            <div className='balloonControls'>
              <div
                className='balloonDrag'
                onMouseDown={this.mouseDragDown}
                onMouseUp={() => this.props.store.balloon.dragClick(false)}
                onMouseLeave={() => this.props.store.balloon.dragClick(false)}
                onMouseMove={this.mouseDrag}
              >
                <hr />
              </div>
              <Button
                btnType={BUTTON_TYPE.CLOSE}
                onClick={() => this.props.store.balloon.unpin()}
              >
                <span className="lnr lnr-cross" />
              </Button>
            </div>
          )}
        <div className='balloonNewsContainer'>
          <div className={news}>
            {this.news.map(n => (<div key={`news_${n.id}`}>{n.message}</div>))}
          </div>
          {this.pinned && (
            <div className={sources}>
              {this.news.map(n => (<div key={`sources_${n.id}`}>{n.sources}</div>))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Balloon;
