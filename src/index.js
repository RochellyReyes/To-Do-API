const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Road2hire',
//     database: 'todo'
// });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

try {
    connection.connect();
   } catch (e) {
    console.log('Oops. Connection to MySQL failed.');
    console.log(e);
   }

const api = express();
//Middleware  https://expressjs.com/en/starter/static-files.html
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.get('/debug', (req, res) => {
    res.send(JSON.stringify(process.env));
});

api.get('/tasks', (req,res)=>{
    connection.query('SELECT * FROM tasks ORDER BY created DESC', (error, results) => {
        if(error) return res.json({error: error});

        res.json(results);
    });
});

api.post('/tasks/add', (req, res) => {
    //console.log(req.body);
    //res.send('It works!')
    connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
        if (error) return res.json({ error: error });

        connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
            if (error) return res.json({ error: error });
            //console.log(results);
            res.json({
              id: results[0]['LAST_INSERT_ID()'],
              description: req.body.item
            });
        });
    });
});

api.post('/tasks/:id/update', (req, res) => {
    //console.log(req.body)
    connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [req.body.completed, req.params.id], (error, results)=>{
        if (error) return res.json({error:error});

        res.json({});
    })
});

api.post('/tasks/:id/remove', (req, res) => {
    connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (error, results)=>{
        if (error) return res.json({error:error});

        res.json({});
    });
});





api.listen(3000, () =>{
    console.log(`API running on port 3000`)
});