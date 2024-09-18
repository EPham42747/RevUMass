const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const login = require('./routes/login');
const home = require('./routes/home');
const contribute = require('./routes/contribute');
const food = require('./routes/food');
const dorms = require('./routes/dorms');
const studySpots = require('./routes/studySpots');
const reviews = require('./routes/reviews');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', login);
// app.use('/home', home);
// app.use('/contribute', contribute);
app.use('/food', food);
// app.use('/dorms', dorms);
// app.use('/studySpots', studySpots);
app.use('/review', reviews);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DB_URI).then(() => console.log('Connected to MongoDb'));
  const server = app.listen(process.env.PORT || 3001, () => { console.log('Server started on port 3001') });

  const shutdown = (signal) => {
    console.log(`\nReceived ${signal}, closing server`);
    server.close(() => process.exit(0));
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;