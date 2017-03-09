const saveProjectionInfo = (req) => {
  console.log('Before Session', req.session);
  req.session.projection = req.data;
  console.log('After Session', req.session);
  return { status: 'ok' };
};

export default function change(req, url) {
  // if (url[1] === 'PROJECTION') {
  Promise.resolve(saveProjectionInfo);
  //}
}
