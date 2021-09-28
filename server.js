const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const mysql = require('mysql');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @TODO: restrict cors only from trusted sources
app.use(cors({
  origin: '*',
}));

app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 3500;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    if (process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      console.warn('Running in dev mode without DB connection ⚠️');
    }
  } else {
    console.log('DB connection established');
  }
});

// Routes
app.post('/api/account/createAccount', (req, res) => {
  // @TODO: needs a server side captcha/recaptcha check

  const { username, s, v } = req.body;

  // @TODO: get the actual list of all supported chars from the core server
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const sql = `INSERT INTO account
            (
                username, s, v
            )
            VALUES
            (
                ?, ?, ?
            )`;

  if (!username.match(format)) {
    connection.query(sql, [username, s, v], (err, rows, fields) => {
      if (err) throw err;
      res.send('Your account was successfully created. Please set your realmlist to `set realmlist logon1.thealphaproject.eu`! Have fun!');
    });
  } else if (username.match(format)) {
    res.send('Remove odd characters to continue!');
  } else if (username.length > 16) {
    res.send('The given Username is too long! Please use a username with a maximum of 16 characters!');
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
