const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios').default;

const app = express();

const PORT = process.env.PORT || 80;
const POSTMARK_TOKEN = process.env.POSTMARK_TOKEN;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.post('/api/email', async (req, res) => {
  const data = req.body;
  const response = await axios.post(
    'https://api.postmarkapp.com/email/withTemplate/',
    data,
    {
      headers: { 'X-Postmark-Server-Token': POSTMARK_TOKEN },
    }
  );
  if (response.status !== 200)
    res.status(500).json({ message: 'error connecting to postmark' });
  res.status(200).send(response.data);
});

app.use('/', (req, res, next) => {
  const env = req.subdomains[0] || 'dev';
  req.url = `/${env}${req.originalUrl}`;
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => console.log('listening on port: ', PORT));
