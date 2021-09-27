const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const mysql = require('mysql');


const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));


const PORT = process.env.PORT || 3500;

const connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
});

connection.connect( error => {
    if(error) throw error;
    console.log('DB connection established');
});

//Routes
app.post('/api/account/createAccount', (req, res) => {
    const {username, s, v} = req.body;
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    const sql = `INSERT INTO account
            (
                username, s, v
            )
            VALUES
            (
                ?, ?, ?
            )`;
    
    if(!username.match(format)) {
      connection.query(sql, [username, s, v], function(err, rows, fields) {
        if (err) throw err;
        res.send('Your account was successfully created. Please set your realmlist to `set realmlist logon1.thealphaproject.eu`! Have fun!');
      });
    }

    else if(username.match(format)){
      res.send("Remove odd characters to continue!");
      return;
    }

    else if(username.length > 16){
      res.send("The given Username is too long! Please use a username with a maximum of 16 characters!");
      return;
    }
    
   
    
})


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));




