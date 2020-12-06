const routes = {
  BILLING() { return `/billing` },
  DETAIL(slug) { return `/product/${slug}`},
  HOME() { return `/`; },
  LOGIN() { return `/login`; },
  ORDER() { return `/order` },
  PAYMENT() { return `/payment`},
  PREDICTION() { return `/prediction` },
  PRODUCT() { return `/products`},
  REPORT() { return `/report` },
  TRANSACTION() { return `/history-transaction` },
  USER() { return `/user`},
};

export default routes;