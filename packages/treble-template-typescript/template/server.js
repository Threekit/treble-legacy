const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 80;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.use('/', (req, res, next) => {
  const env = req.subdomains[0] || 'dev';
  req.url = `/${env}${req.originalUrl}`;
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => console.log('listening on port: ', PORT));
