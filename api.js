const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {
    BASE_URL,
    DB_HOST,
    DB_DATEBASE
} = require('./config');



module.exports = app;