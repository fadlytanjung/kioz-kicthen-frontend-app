const routes = {
  PAYMENT() { return `/payment`},
  DETAIL(slug) { return `/product/${slug}`},
  HOME() { return `/`; },
  LOGIN() { return `/login`; },
};

export default routes;