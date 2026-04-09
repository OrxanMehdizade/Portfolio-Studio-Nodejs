const express = require('express');
const expressLoader = require('./loaders/expressLoader');

const app = express();

expressLoader(app);

app.get('/', (req, res) => {
  res.json({ message: "API running" });
});

module.exports = app;