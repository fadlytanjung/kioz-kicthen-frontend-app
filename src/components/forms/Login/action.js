import { ACTIONS } from '../../../constants';
import { clearStorages, removeData, setData, setUserData } from '../../../utils/common';

export function authlogin(data, user) {
  return dispatch => {
    dispatch({ type: ACTIONS.LOADING });
    if (data.password === user[0].password) {
      delete user[0]['password'];
      setUserData(user[0]);
      setData('isLogin', true);
      dispatch({
        type: ACTIONS.LOGIN,
        data: { ...user[0] },
        isLogin: true,
        messageError: ''
      });
    } else {
      dispatch({
        type: ACTIONS.LOGIN,
        data: {},
        isLogin: false,
        messageError: 'Email atau password tidak sesuai',
      });
    }
    dispatch({ type: ACTIONS.DONE_LOADING });
  };
}

export function logOut() {
  return dispatch => {
    clearStorages();
    removeData('isLogin');
    dispatch({
      type: ACTIONS.LOGOUT,
      data: {},
      isLogin: false,
    });
  };
}
export function setAuthData(data, isLogin) {
  return dispatch => {
    dispatch({
      type: ACTIONS.LOGIN,
      data: { ...data },
      isLogin: isLogin,
      messageError: ''
    });
  };
}
