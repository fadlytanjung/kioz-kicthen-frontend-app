const routes = {
  HOME() { return `/`; },
  LOGIN() { return `/login`; },
  DETAIL(slug) { return `/product/${slug}`},
};

export default routes;