const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const mysql = require('mysql');
const fetch = require('isomorphic-fetch');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

// Set CORS on production only
const origin = process.env.NODE_ENV === 'production' ? /thealphaproject\.eu$/ : '*';
app.use(cors({
  origin,
}));

const PORT = process.env.PORT || 3500;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  insecureAuth: process.env.NODE_ENV !== 'production',
});

connection.connect((error) => {
  if (error) {
    if (process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      console.warn('Running in dev mode without DB connection ⚠️');
      console.warn(JSON.stringify(error));
    }
  } else {
    console.log('DB connection established');
  }
});

app.post('/api/account/create', (req, res) => {
  const {
    username, s, v, email, token,
  } = req.body;

  // Check recaptchas
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  fetch(url, {
    method: 'post',
  })
    .then((response) => response.json())
    .then((response) => {
      const { success, score } = response;

      // If didn't go past recaptcha then block and log
      if (success !== true) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.warn(`Invalid submission from ${ip} with score ${score}`);

        throw new Error({
          error: 'RECAPTCHA_INVALID',
        });
      }

      // @TODO: get the actual list of all supported chars from the core server
      const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

      const sql = `INSERT INTO account
        (
          username, s, v, email, last_ip
        )
        VALUES
        (
          ?, ?, ?, ?, ?
        )`;

      if (!username.match(format)) {
        connection.query(sql, [username, s, v, email], (err, rows, fields) => {
          if (err) throw err;
          res.json({
            success: 'ACCOUNT_CREATED',
          });
        });
      } else if (username.match(format)) {
        res.json({
          error: 'NAME_INVALID_SYMBOLS',
        });
      } else if (username.length > 16) {
        res.json({
          error: 'NAME_INVALID_LENGTH',
        });
      }
    })
    .catch((error) => res.json({ error }));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
