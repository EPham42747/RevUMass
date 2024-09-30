const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');

const { sequelize } = require('./models/db');

const home = require('./routes/homeRoutes');
const food = require('./routes/foodRoutes');
const dorms = require('./routes/dormRoutes');
const studySpots = require('./routes/studySpotRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', home);
app.use('/food', food);
// app.use('/dorms', dorms);
// app.use('/studySpots', studySpots);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate().then(() => console.log('Connected to Neon')).then(() => sequelize.sync());
  const server = app.listen(process.env.PORT || 3001, () => { console.log('Server started on port 3001') });

  const shutdown = (signal) => {
    console.log(`\nReceived ${signal}, closing server`);
    server.close(() => process.exit(0));
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;
