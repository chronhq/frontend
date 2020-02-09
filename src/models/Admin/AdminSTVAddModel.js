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

  @observable startDate = undefined;

  @observable endDate = undefined;

  @observable references = ['https://chronmaps.com'];

  @observable files = [];

  @observable uploadError;

  @observable waiting = false;

  @observable specialScreen = undefined;

  @observable conflicts = {};

  @observable overlaps;

  @observable form = this.rootStore.auth.createForm(
    '/api/spacetime-volumes/',
    'post',
    action((context, error) => {
      this.waiting = false;
      this.specialScreen = undefined;
      if (error) {
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
      } else { // success
        this.rootStore.data.territorialEntities
          .data[this.entity].stvs.push(context.response.data);
        this.uploadError = undefined;
        this.specialScreen = 'edit';
      }
    }),
    action(() => {
      this.waiting = true;
    })
  );

  setDate = action((d, type) => {
    this[type] = d;
  });

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
    return false;
  }

  @computed get data() {
    const territory = this.files.length ? this.files[0] : undefined;
    const overlaps = this.overlaps ? { overlaps: this.overlaps } : {};
    return this.error ? {} : {
      entity: this.entity,
      references: this.references,
      end_date: julianInt(this.endDate),
      start_date: julianInt(this.startDate),
      ...overlaps,
      territory,
    };
  }

  @computed get message() {
    if (this.stage === 'uploading') return this.uploadError;
    return this.error;
  }

  upload = action(() => {
    this.uploadError = undefined;
    this.form.submit(this.data);
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
    this.uploadError = 'Overlps Conflict';
    this.overlaps = {};
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
