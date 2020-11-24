import * as currencyFormat from '../currencyFormat';

describe('currencyFormat', () => {
  it('returns toCurrency', () => {
    expect(currencyFormat.toCurrency(10000)).toEqual('10,000');
  });

  it('returns toNumber', () => {
    expect(currencyFormat.toNumber('10,000')).toEqual(10000);
  });

});
