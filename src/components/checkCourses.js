export default function (next) {
  if (next.coursesLoading === false && next.errorCourses !== false) {
    // API failed to answer (dead api)
    next.history.push('/504');
  } else if (next.coursesLoaded === true
    && Object.keys(next.availableCourses).length === 0) {
    // empty API answer (dead db)
    next.history.push('/502');
  }
}
