import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';
import helmet from 'helmet';

const bundler = webpack(config);
const app = express();
const port = 4000;

app.use(helmet.frameguard());
app.use(historyApiFallback());
app.use(webpackDevMiddleware(bundler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  quiet: true,
  stats: "minimal",
}));
app.use(webpackHotMiddleware(bundler));
app.use(express.static(path.join(__dirname, '../src')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port);

console.log(`App is running on port ${port}`);
