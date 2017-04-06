import { tables, getFromDB } from '../shared';

export default function facts(req, res) {
  const fixInventors = (data) => {
    const fixedData = Object.keys(data.byId).reduce((prev, id) => ({
      ...prev,
      [id]: {
        ...data.byId[id],
        // Inventor field before looks like "{1,3}" => now it's an array
        inventor: data.byId[id].inventor.replace(/{|}/g, '').split(',')
      }
    }
    ), {});
    res.json({ byId: fixedData });
  };

  return getFromDB(fixInventors, tables.INVENTIONS, 'byId');
}
