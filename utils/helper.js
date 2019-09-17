export const orderArray = array => {
  return array.sort((a, b) => {
    return a > b ? 1 : -1;
  });
};

export const orderArrayOfObjects = obj => {
  return obj.sort((a, b) => {
    return a.band > b.band ? 1 : -1;
  });
};

export const downloadJSON = values => {
  const name = values.name
    .toString()
    .toLowerCase()
    .replace(/ /g, '_');
  const filename = `${name}.json`;
  const contentType = 'application/json;charset=utf-8;';

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(values)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    a.download = filename;
    a.href =
      'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(values));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
