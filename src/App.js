import React from 'react';
import PropTypes from 'prop-types';
import AppContextProvider from './contexts';
import pages from './pages';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ROUTES } from './configs';
import { Switch, Route } from 'react-router-dom';
import {
  checkExpireTime,
  clearStorages,
  getUserToken,
  getUserData
} from '../src/utils/common';
import "@babel/polyfill";

const _checkAuth = () => {
  const { pathname } = location;
  const { HOME,LOGIN } = ROUTES;
  const isLoggedIn = (pathname == LOGIN());
  let shouldRender = true;
  const userDataCache = JSON.parse(getUserData());
  const role = (userDataCache) ? userDataCache.role : 2;
  if (!getUserToken() && pathname !== LOGIN()) {
    location.href = LOGIN();
    shouldRender = false;
  } else if (checkExpireTime() && pathname !== LOGIN()) {
    clearStorages();
    location.href = LOGIN();
    shouldRender = false;
  } else if (checkExpireTime()) {
    clearStorages();
  } else if (getUserToken() && pathname === LOGIN()) {
    location.href = HOME();
    shouldRender = false;
  } 
  return [isLoggedIn, shouldRender];
};

const App = ({ history, store }) => {
  // const { Login } = pages;
  // const [isLoggedIn, shouldRender] = _checkAuth();

  // const routeApp = isLoggedIn ? <Login /> :
  //   (<Switch>
  //     <Route exact path={'/'} component={pages.Home}/>
  //     <Route component={pages.Error404} />
  //   </Switch>);

  // if (!shouldRender) {
  //   return (null);
  // }

  return (
    <Provider store={store}>
      <main>
        <Router history={history}>
          <AppContextProvider>
            <Switch>
              <Route exact path={ROUTES.HOME()} component={pages.Home} />
              <Route exact path={ROUTES.DETAIL(':slug')} component={pages.Detail} />
              <Route component={pages.Error404} />
            </Switch>
          </AppContextProvider>
        </Router>
      </main>
    </Provider>
  );
}

App.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default hot(App);