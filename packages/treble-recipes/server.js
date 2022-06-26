const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const paths = require('./config/paths');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 80;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.get('/api/health', (req, res) => {
  res.status(200).send({ message: 'server healthy!' });
});

app.get('/', (req, res) => {
  res.sendFile(paths.recipesBuildJs);
});

app.use(express.static(paths.recipesBuild));

app.listen(PORT, () => console.log('listening on port: ', PORT));
