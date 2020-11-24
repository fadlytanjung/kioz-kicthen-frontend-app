import * as isDate from '../isDate';

describe('isDate Helpers', () => {

  it('returns true is date', () => {
    expect(isDate.isDate('22-01-2020')).toEqual(true);
  });

  it('returns convertDate', () => {
    expect(isDate.convertDate('01/22/2020')).toEqual('22/01/2020');
  });

  it('returns convertDateDash', () => {
    expect(isDate.convertDateDash('01-22-2020')).toEqual('22-01-2020');
  });

  it('returns toNormalDate', () => {
    expect(isDate.toNormalDate('2020-01-22')).toEqual('2020-01-22');
  });

  it('returns toNormalDate', () => {
    expect(isDate.toNormalDate('2020-01-01')).toEqual('2020-01-01');
  });

  it('returns convertDateSlash', () => {
    expect(isDate.convertDateSlash('01-22-2020')).toEqual('22/01/2020');
  });

  it('returns convertDateSlash', () => {
    expect(isDate.convertDateSlash('11-22-2020')).toEqual('22/11/2020');
  });

  it('returns normalizeDate', () => {
    expect(isDate.normalizeDate('2020-01-22')).toEqual('22-01-2020');
  });

  it('returns dateApiFormat', () => {
    expect(isDate.dateApiFormat('02 / 04 / 2020')).toEqual('2020-04-02');
  });

});
