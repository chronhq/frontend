/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observable, action, computed } from 'mobx';
import { julianInt } from '../YearModel';

class AdminSTVAddModel {
  @observable entity;

  @observable stvId;

  @observable startDate = undefined;

  @observable endDate = undefined;

  @observable references = [];

  @observable files = [];

  @observable uploadError;

  @observable waiting = false;

  @observable specialScreen = undefined;

  @observable conflicts = {};

  @observable overlaps;

  @observable form = this.rootStore.auth.createForm(
    '/api/spacetime-volumes/',
    'post',
    action(this.handleSubmit),
    action(() => {
      this.waiting = true;
    })
  );

  handleSubmit = action((context, error) => {
    this.waiting = false;
    this.specialScreen = undefined;
    if (error) {
      this.handleError(context);
    } else { // success
      this.handleSuccess(context);
    }
  })

  handleError = action((context) => {
    const { response } = context.response;
    if (response !== undefined) {
      console.log(response);
      this.conflicts = undefined;
      this.overlaps = undefined;
      this.uploadError = response.data.error || response.statusText;
      if (response.status === 409) {
        this.conflicts = response.data.overlaps;
        this.specialScreen = 'conflict';
      }
    } else {
      this.uploadError = 'Unknown Error';
    }
  })

  handleSuccess = action((context) => {
    const { stvs } = this.entityData;
    this.stvId = context.response.data.id;
    this.entityData.stvs = [
      ...stvs.filter((i) => i.id !== this.stvId),
      context.response.data
    ];
    this.uploadError = undefined;
    this.rootStore.mapStyle.uploadedGeoJSON = context.response.data.territory;
    this.specialScreen = 'edit';
  })

  setDate = action((d, type) => {
    this[type] = d;
  });

  @computed get entityData() {
    return this.rootStore.data.territorialEntities.data[this.entity];
  }

  @computed get stage() {
    if (this.specialScreen) return this.specialScreen;
    if (this.form.progress) return 'uploading';
    return !this.files.length ? 'select' : 'ready';
  }

  @computed get advice() {
    if (this.specialScreen === 'edit') return 'References are important for users and other contributors';
    if (this.specialScreen === 'conflict') {
      return 'Make a descision to overwrite territories on server or change newly uploaded territory';
    }
    if (this.uploadError) {
      return [
        'If there was an error during upload -',
        'try again or change your data.',
        'Feel free to contact us on Discord or Github'].join(' ');
    }
    return 'If there is not enough data - set start date to January 1, and end date to December 31';
  }

  @computed get error() {
    if (!(this.startDate instanceof Date && this.endDate instanceof Date)) {
      return 'Set the dates first';
    }
    if (this.startDate > this.endDate) {
      return 'Start date should be earlier than end date';
    }
    if (!this.files.length) return 'Select file';
    if (!this.references.length && this.specialScreen === 'edit') {
      return 'Territory must have at least one reference';
    }
    return false;
  }

  @computed get data() {
    const territory = this.files.length ? this.files[0] : undefined;
    const overlaps = {};
    if (this.overlaps) {
      overlaps.overlaps = Object.keys(this.overlaps).filter((k) => this.overlaps[k]).map(Number);
      if (overlaps.overlaps.length === 0) overlaps.overlaps.push('');
    }
    return this.error ? {} : {
      entity: this.entity,
      references: this.references,
      end_date: julianInt(this.endDate),
      start_date: julianInt(this.startDate),
      ...overlaps,
      territory,
    };
  }

  @computed get dataUpdate() {
    const { references, entity } = this.data;
    return { references, entity };
  }

  @computed get message() {
    if (this.stage === 'uploading') return this.uploadError;
    return this.error;
  }

  upload = action(() => {
    this.uploadError = undefined;
    if (!this.stvId) {
      this.form.submit(this.data);
    } else {
      this.form.submit(this.dataUpdate, {
        method: 'put',
        url: `/api/spacetime-volumes/${this.stvId}/`
      });
    }
  })

  addReferences = action((refs) => {
    this.references = refs;
  })

  selectFiles = action((f) => {
    this.files = f;
    const file = f.length ? f[0] : undefined;
    if (!file) {
      this.files = [];
      return;
    }
    this.files = f;

    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    this.rootStore.mapStyle.uploadedGeoJSON = undefined;
    reader.onload = action((e) => {
      try {
        this.rootStore.mapStyle.uploadedGeoJSONColor = this.rootStore.data
          .territorialEntities.data[this.entity].color;
        this.rootStore.mapStyle.uploadedGeoJSON = JSON.parse(e.target.result);
      } catch {
        this.files = [];
        this.uploadError = 'File must be in a valid GeoJSON';
      }
    });
    reader.onerror = action(() => {
      this.files = [];
      this.uploadError = 'File can not be read';
    });
  })

  cancelOverlap = action(() => {
    this.specialScreen = undefined;
    this.uploadError = 'Overlaps Conflict';
    this.overlaps = undefined;
  })

  confirmOverlaps = (entity, value) => {
    this.overlaps = observable({
      ...(this.overlaps || {}),
      [entity]: value
    });
  }

  constructor(store, entity) {
    this.rootStore = store;
    this.entity = entity;
  }
}

export default AdminSTVAddModel;
