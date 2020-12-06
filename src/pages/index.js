import React, { lazy, Suspense } from 'react';

const Suspensed = (Element) => function suspense(props) {
  return (
    <Suspense fallback={<div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>Loading...</div>}>
      <Element {...props} />
    </Suspense>
  );
};
const pages = {
  Billing: Suspensed(lazy(()=>import('./Billing'))),
  Detail: Suspensed(lazy(() => import('./Detail'))),
  Error404: Suspensed(lazy(() => import('./Error404'))),
  Home: Suspensed(lazy(() => import('./Home'))),
  Login: Suspensed(lazy(() => import('./Login'))),
  Order: Suspensed(lazy(() => import('./Order'))),
  Payment: Suspensed(lazy(()=> import('./Payment'))),
  Prediction: Suspensed(lazy(() => import('./Prediction'))),
  Product: Suspensed(lazy(() => import('./Product'))),
  Report: Suspensed(lazy(() => import('./Report'))),
  Transaction: Suspensed(lazy(() => import('./Transaction'))),
  User: Suspensed(lazy(() => import('./User'))),
};

export default pages;
