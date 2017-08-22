import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from './App';
// import NotFound from './'
import StartPage from './components/StartPage';
import { loadData } from './reducers/actions';

const listOfCourses = [{
  resource: 'COURSES',
  req: {
    filter: JSON.stringify({ where: { active: true } }),
  },
}];


const mapStateToAppProps = (state) => ({
  // location: state.location
  courses: state.courses.list.byId
})

const mapDispatchToProps = (dispatch) => ({
    loadData: bindActionCreators(loadData, dispatch),
  }
);

// this.props.courses.list.byId.
const AppRouter = connect(mapStateToAppProps, mapDispatchToProps)((props) =>
{
  // console.log(props);
  // props.loadData(listOfCourses);

  return (
  <div>
    <Switch>
      {/* <Route exact path={`/`} render={() => <StartPage id={props.courses}/>} /> */}
       <Route exact path='/' render={() => <App />} />
      {/*
      {Object.keys(props.courses).map(id =>
      )}
       */}
       {/*
      <Route path={`/1`} render={() => <App /> } />
      <Route exact path={`/`} render={() => <StartPage id={1}/>} />
       <Route path='/course1' component={} />
       <Route render={NotFound} />
      */}
    </Switch>
  </div>
  );
}
);


// class AppRouter extends AnotherClass {
//   constructor(props) {
//     super(props);
//   }

//   // methods
// }

export default AppRouter;
