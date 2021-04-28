const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const db= require('./config/db');
const port = process.env.PORT || 8000;
const route = require('./routes');


db.connect(process.env.DB_URL);
app.use(express.json());
route(app);
app.listen(port, () => {
      console.log(`App listening at http://localhost`,port);
  });
  