const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const mysql = require('mysql');


const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));


const PORT = process.env.PORT || 3500;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'realm',
});

connection.connect( error => {
    if(error) throw error;
    console.log('DB connection established');
});

//Routes
app.post('/api/account/createAccount', (req, res) => {
    console.log(req);
    const {username, s, v} = req.body;
    
    const sql = `INSERT INTO account
            (
                username, s, v
            )
            VALUES
            (
                ?, ?, ?
            )`;
    
		
    if(username.length > 16){
      res.send("The given Username is too long! Please use a username with a maximum of 16 characters!");
      return;
    }
    
    connection.query(sql, [username, s, v], function(err, rows, fields) {
      if (err) throw err;
      res.send('Your account was successfully created. Please set your realmlist to `set realmlist logon1.thealphaproject.eu`! Have fun!');
    });
    
})


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));




