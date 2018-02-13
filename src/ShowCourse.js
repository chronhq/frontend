import React from 'react';

import RouterMiddleware from './containers/CourseSelection/RouterMiddleware';
import UI from './containers/UI';
import Flag from './Flag';
// import DevTools from './DevTools';
import './ShowCourse.less';

const ShowCourse = ({ match }) => (
  <div>
    <Flag
      name="CourseSelection"
      render={() => <RouterMiddleware id={match.params.id} />}
      // render={() => <CourseSelection />}
      fallbackRender={() => <UI />}
    />
  </div>
);

export default ShowCourse;
