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
  Payment: Suspensed(lazy(()=> import('./Payment'))),
  Detail: Suspensed(lazy(() => import('./Detail'))),
  Error404: Suspensed(lazy(() => import('./Error404'))),
  Home: Suspensed(lazy(() => import('./Home'))),
};

export default pages;
