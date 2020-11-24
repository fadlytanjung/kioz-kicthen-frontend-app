import gzipStatic from 'connect-gzip-static';
import historyApiFallback from 'connect-history-api-fallback';
import express from 'express';
import path from 'path';
import helmet from 'helmet';

const app = express();
const port = 4000;

app.use(helmet.frameguard());
app.use(gzipStatic('dist'));
app.use(historyApiFallback());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);

console.log(`App is running on port ${port}`);
