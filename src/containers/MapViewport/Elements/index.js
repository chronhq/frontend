import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Borders from './Borders';
import Contour from './Contour';
import Locations from '../../Locations';

import Decorations from './Decorations';
import GeoPoints from './GeoPoints';
import Labels from './Labels';
import Expeditions from '../../Expeditions';

const BasicElements = () => (
  <g id='basicElements'>
    <Borders />
    <Contour />
    <Locations />
  </g>
);

const CourseElements = () => (
  <g id='courseElements'>
    <Decorations />
    <GeoPoints />
    <Labels />
    <Expeditions />
  </g>
);

@inject('store')
@observer
export default class Elements extends React.Component {
  @computed get courseId() {
    return this.props.store.flags.flags.runtime.SelectedCourse;
  }
  render() {
    return (
      <g>
        <BasicElements />
        {this.courseId !== 0 &&
          <CourseElements />
        }
      </g>
    );
  }
}
