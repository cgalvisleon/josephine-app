const express = require('express');
const path = require('path');
const app = express();

// Body parser limit
app.use(express.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(3000);
