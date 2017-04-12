import React from 'react';

const DownloadButton = ({ data, filename, label }) => {
  const blob = new Blob([data], { type: 'application/msword' });
  console.log('Blob is ready for data', data);
  const fileData = window.URL.createObjectURL(blob);
  return (
    <div className="btn-group">
      <a href={fileData} rel='noopener noreferer' target='_blank' download={filename} className="btn  btn-default btn-sm">
        {label}
      </a>
    </div>
  );
};

const ExportFromFeed = ({ exported }) => (
  <div>
    <DownloadButton
      filename="facts.doc"
      label="Экспорт в doc"
      data={exported}
    />
    <DownloadButton
      filename="facts.pdf"
      label="Экспорт в pdf"
      data={exported}
    />
  </div>
);

export default ExportFromFeed;
