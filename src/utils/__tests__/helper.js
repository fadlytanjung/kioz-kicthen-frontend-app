import * as helper from '../helper';

describe('capitalize', () => {
  it('returns capitalize', () => {
    expect(helper.capitalize('fulan')).toEqual('Fulan');
  });

  it('returns capitalize', () => {
    expect(helper.capitalize(1)).toEqual(1);
  });

  it('returns convertHex', () => {
    expect(helper.convertHex('#FFFFFF', 1)).toEqual('rgba(255,255,255,0.01)');
  });

  it('returns sumVal', () => {
    expect(helper.sumVal([{ value: 1 }, { value: 2 }], 'value')).toEqual(3);
  });

  it('returns dateFormat', () => {
    let date = new Date();
    expect(helper.dateFormat(date)).toEqual(`${date.getDate()}`.padStart(2, '0') +
      ` / ` + `${date.getMonth() + 1}`.padStart(2, '0') +
      ` / ` + `${date.getFullYear()}`);
  });

  it('returns filterQuery', () => {
    expect(helper.filterQuery([], 'key', 'val').length).toEqual(0);
    expect(helper.filterQuery([{ key: 'val' }], 'key', 'val').length).toEqual(1);
  });

  it('returns checkFilter', () => {
    expect(helper.checkFilter(undefined)).toEqual('');
    expect(helper.checkFilter('?page=1&size=10&filter=tess&keyword=gmail')).toEqual('filter=tess&keyword=gmail');
  });

  it('returns queryFilter', () => {

    const data = [
      {
        username: 'username1',
        email: 'email1',
        transactionName: 'transaction1',
        createdAt: '2020-04-27',
      },
      {
        username: 'username2',
        email: 'email2',
        transactionName: 'transaction2',
        createdAt: '2020-04-27',
      },
    ];
    expect(helper.queryFilter(data, '?page=1&size=10').length).toEqual(2);
    expect(helper.queryFilter(data, '?page=1&size=10&filter=27 / 04 / 2020').length).toEqual(2);
    expect(helper.queryFilter(data, '?page=1&size=10&filter=27 / 04 / 2020&keyword=email1').length).toEqual(1);
    expect(helper.queryFilter(data, '?page=1&size=10&filter=27 / 04 / 2020&keyword=username1').length).toEqual(1);
  });

});
