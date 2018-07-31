import { computed, observable } from 'mobx';
import rbush from 'rbush';

export default class Decor {
  @observable tree = rbush(
    9, ['.geopoint[0]', '.geopoint[1]', '.geopoint[0]', '.geopoint[1]']
  );

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get courseId() {
    return this.rootStore.flags.flags.runtime.SelectedCourse;
  }

  @computed get mapDecorationsRaw() {
    return Object.values(this.rootStore.data.MapDecorations.data)
      .filter(c => c.courseId === this.courseId);
  }

  @computed get mapLabelsRaw() {
    return Object.values(this.rootStore.data.MapLabels.data)
      .filter(c => c.courseId === this.courseId);
  }

  @computed get mapLabels() {
    const pics = [];
    const toponyms = [];
    const fonts = {};
    Object.values(this.mapLabelsRaw).map((cur) => {
      if (cur.style.pic === true) {
        // mimic map decorations
        const pic = {
          courseId: cur.courseId,
          picId: cur.string[this.rootStore.i18n.lng],
          geopoint: cur.geopoint,
          size: cur.style.size,
        };
        pics.push(pic);
      } else {
        const label = {
          ...cur,
          string: cur.string[this.rootStore.i18n.lng],
        };
        toponyms.push(label);
        fonts[label.style.font] = label.style.font;
      }
      return null;
    });
    return { toponyms, pics, fonts };
  }

  @computed get mapLabelsPics() {
    return this.mapLabels.pics;
  }

  @computed get toponymsRaw() {
    return this.mapLabels.toponyms.sort((a, b) => (a.style.size - b.style.size));
  }

  @computed get toponymsClustered() {
    const tmp = {};
    const zoomLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    this.tree.clear();
    this.tree.load(this.toponymsRaw);

    Object.values(this.toponymsRaw).map((top) => {
      tmp[top.id] = { ...top, zoomLevels: [] };
      return null;
    });
    zoomLevels.map((z) => {
      const height = 10 / (2 ** z);
      const width = 10 / (2 ** z);
      Object.values(this.toponymsRaw).map((p) => {
        const x = p.geopoint[0];
        const y = p.geopoint[1];
        const neighbors = this.tree
          .search({
            minX: x - width,
            minY: y - height,
            maxX: x + width,
            maxY: y + height
          })
          .filter(n => tmp[n.id].zoomLevels[z] === undefined);
        neighbors.forEach((neighbor) => {
          const { id } = { ...neighbor };
          if (id === p.id) {
            tmp[id].zoomLevels[z] = true;
          } else {
            tmp[id].zoomLevels[z] = false;
          }
        }); // neighbors
        return null;
      }); // toponyms
      return null;
    }); // zoom

    const toponyms = {};
    Object.values(tmp).map((label) => {
      toponyms[label.style.font] = label.style.font in toponyms
        ? [
          ...toponyms[label.style.font],
          label,
        ] : [label];
      return null;
    });
    return toponyms;
  }

  @computed get toponyms() {
    const available = {};
    Object.keys(this.toponymsClustered).map((f) => {
      if (f in this.rootStore.view.fonts) {
        available[f] = this.toponymsClustered[f];
      }
      return null;
    });
    return available;
  }

  @computed get decorations() {
    const decor = [];
    this.mapDecorationsRaw.map((d) => {
      const x = d.geopoint[0];
      const y = d.geopoint[1];
      if (this.rootStore.projection.inTheBox(x, y)) {
        decor.push(d);
      }
      return null;
    });
    return decor;
  }

  @computed get oceans() {
    const decor = [];
    Object.values(this.mapLabelsPics).map((d) => {
      const x = d.geopoint[0];
      const y = d.geopoint[1];
      if (this.rootStore.projection.inTheBox(x, y)) {
        decor.push(d);
      }
      return null;
    });
    return decor;
  }
}
