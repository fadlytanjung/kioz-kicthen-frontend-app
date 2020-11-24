export default (title, arr) => {
  const newArr = [];
  newArr.push(title);
  arr.map((item) => {
    const newItem = [];

    Object.values(item).map((obj) =>
      newItem.push((obj) ? obj.replace(/ /g, '-').replace(/,/g, '').replace(/(\r\n|\n|\r)/gm, '') : 'null')
    );

    newArr.push(newItem);
  });

  return newArr.map(e => e.join(';')).join('\n');
};
