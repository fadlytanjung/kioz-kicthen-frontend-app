export default function(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);
  let csvData = new Array();
  let jsonObject = request.responseText.split(/\r?\n|\r/);
  for (let i = 0; i < jsonObject.length; i++) {
    csvData.push(jsonObject[i].split(';'));
  }
  return csvData;
}
