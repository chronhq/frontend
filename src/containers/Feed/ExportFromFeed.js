import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

const DownloadButton = ({
  cb, label, disabled
}) => (
  <button disabled={disabled} onClick={() => cb()} className="btn btn-default">
    {label}
  </button>
);

@inject('store')
@observer
class ExportFromFeed extends React.Component {
  @computed get buttons() {
    return this.props.store.i18n.buttons;
  }

  @computed get exportCb() {
    return f => this.props.store.feed.export(f);
  }
  @computed get feedDownloadLinkId() {
    return this.props.store.feed.feedDownloadLinkId;
  }

  render() {
    return (
      <div className='export-buttons'>
        <a // eslint-disable-line
          href=""
          id={this.feedDownloadLinkId}
          target='_blank' rel='noopener noreferer' // eslint-disable-line
          style={{ display: 'none' }}
        />
        <DownloadButton
          label={this.buttons.export}
          cb={() => this.exportCb('facts.txt')}
        />
      </div>
    );
  }
}

export default ExportFromFeed;
