import React from 'react';

export const feedDownloadLinkId = 'exportFromFeedDownloadLink';

const DownloadButton = ({ cb, filename, label, format, disabled }) => (
  <button disabled={disabled} onClick={() => cb(filename, format)} className="btn btn-default">
    {label}
  </button>
);

const ExportFromFeed = ({ cb }) => (
  <div className='export-buttons'>
    <a // eslint-disable-line
      href=""
      id={feedDownloadLinkId}
      target='_blank' rel='noopener noreferer' // eslint-disable-line
      style={{ display: 'none' }}
    />
    <DownloadButton
      filename="facts.txt"
      label="Экспорт в txt"
      format='txt'
      cb={cb}
    />
    <DownloadButton
      filename="facts.pdf"
      label="Экспорт в pdf"
      format='pdf'
      cb={cb}
      disabled
    />
  </div>
);

export default ExportFromFeed;
