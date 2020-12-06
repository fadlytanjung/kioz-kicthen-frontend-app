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
  getUserData
} from '../src/utils/common';
import "@babel/polyfill";

const _checkAuth = () => {
  const { pathname } = location;
  const { LOGIN,PRODUCT } = ROUTES;
  let shouldRender = true;
  const userDataCache = JSON.parse(getUserData());
  const role = (userDataCache) ? userDataCache.role : 'user';
 
  if (getUserData() && role === 'admin' && pathname === LOGIN()) {
    location.href = PRODUCT();
    shouldRender = false;
  } 
  return [shouldRender, role];
};

const App = ({ history, store }) => {
  
  const [shouldRender,role] = _checkAuth();

  const admin = role === 'admin' && (
    <Switch>
      <Route exact path={ROUTES.PRODUCT()} component={pages.Product}/>
      <Route exact path={ROUTES.TRANSACTION()} component={pages.Transaction} />
      <Route exact path={ROUTES.ORDER()} component={pages.Order} />
      <Route exact path={ROUTES.REPORT()} component={pages.Report} />
      <Route exact path={ROUTES.PREDICTION()} component={pages.Prediction} />
      <Route exact path={ROUTES.USER()} component={pages.User} />
      <Route exact path={ROUTES.BILLING()} component={pages.Billing} />
      <Route exact path={ROUTES.HOME()} component={pages.Home} />
      <Route exact path={ROUTES.LOGIN()} component={pages.Login} />
      <Route exact path={ROUTES.PAYMENT()} component={pages.Payment} />
      <Route exact path={ROUTES.DETAIL(':slug')} component={pages.Detail} />
      <Route component={pages.Error404} />
    </Switch>
  );
  if(!shouldRender){
    return null;
  }

  return (
    <Provider store={store}>
      <main>
        <Router history={history}>
          <AppContextProvider>
            <Switch>
              {admin}
              <Route exact path={ROUTES.BILLING()} component={pages.Billing} />
              <Route exact path={ROUTES.HOME()} component={pages.Home} />
              <Route exact path={ROUTES.LOGIN()} component={pages.Login} />
              <Route exact path={ROUTES.PAYMENT()} component={pages.Payment} />
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