import React from 'react';

const DownloadButton = ({ cb, id, filename, label, format }) => (
  <div className="btn-group">
    <a href="#" onClick={() => cb(id, format)} className="btn  btn-default btn-sm">
      {label}
    </a>
    <a
      href="" id={id}
      target='_blank' rel='noopener noreferer'
      download={filename}className="hiddenLink"
      style={{ display: 'none' }}
    />
  </div>
);

const ExportFromFeed = ({ cb }) => (
  <div>
    <DownloadButton
      filename="facts.txt"
      label="Экспорт в txt"
      format='txt'
      id="factstxtdownload"
      cb={cb}
    />
    <DownloadButton
      filename="facts.txt"
      label="Экспорт в pdf"
      format='pdf'
      id="factspdfdownload"
      cb={cb}
    />
  </div>
);

export default ExportFromFeed;
