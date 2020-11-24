import { set } from 'mockdate';
import * as storage from '../common';

delete window.localStorage;
window.localStorage = {};

describe('src/utils/storage', () => {
  test('setUserToken', () => {
    window.localStorage.setItem = jest.fn();
    storage.setUserToken('tes');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('appx_dashboard_user_token', 'tes');
  });

  test('getUserToken', () => {
    window.localStorage.getItem = jest.fn(() => 'tes');
    expect(storage.getUserToken()).toBe('tes');
  });

  test('clearStorages', () => {
    window.localStorage.removeItem = jest.fn();
    storage.clearStorages();
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(1, 'appx_dashboard_expire_time');
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(2, 'appx_dashboard_user_data');
    expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(3, 'appx_dashboard_user_token');
  });

  test('setExpireTime', () => {
    window.localStorage.setItem = jest.fn();
    storage.setExpireTime(1);
  });

  test('checkExpireTime', () => {
    window.localStorage.getItem = jest.fn(() => {});
    set('2011-01-01');
    expect(storage.checkExpireTime()).toBe(true);
    window.localStorage.getItem = jest.fn(() => 100);
    expect(storage.checkExpireTime()).toBe(true);
  });

  test('setUserData', () => {
    window.localStorage.setItem = jest.fn();
    const data = { tes: 'tes' };
    storage.setUserData(data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('appx_dashboard_user_data', JSON.stringify(data));
  });

  test('setRemember', () => {
    window.localStorage.setItem = jest.fn();
    const data = { tes: 'tes' };
    storage.setRemember(data);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('appx_dashboard_remember_session', data);
  });

  test('getUserData', () => {
    window.localStorage.getItem = jest.fn(() => JSON.stringify(null));
    expect(storage.getUserData()).toBe('null');
    window.localStorage.getItem = jest.fn(() => JSON.stringify({ tes: 'tes' }));
    expect(JSON.parse(storage.getUserData()).tes).toBe('tes');
  });

  test('getRemember', () => {
    window.localStorage.getItem = jest.fn(() => JSON.stringify(null));
    expect(storage.getRemember()).toBe('null');
    window.localStorage.getItem = jest.fn(() => JSON.stringify({ tes: 'tes' }));
    expect(JSON.parse(storage.getRemember()).tes).toBe('tes');
  });


  test('isEmpty', ()=>{
    expect(storage.isEmpty({})).toBe(true);
  });
});
