import { ACTIONS } from '../../constants';
import { setData, setUserData } from '../../utils/common';

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
      location.href = '/products';
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
