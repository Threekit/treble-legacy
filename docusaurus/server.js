const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const PORT = 80;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => console.log('listening on port: ', PORT));
