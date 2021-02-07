const express = require('express');
const bodyParser = require('body-parser');

const api = express();
//Middleware  https://expressjs.com/en/starter/static-files.html
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());



api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World to-do-api')
});

api.post('/add', (req, res) => {
    console.log(req.body);
    res.send('It works!')
});







api.listen(3000, () =>{
    console.log(`API running on port 3000`)
});

//middleware
// api.use((req, res, next) => {
//     console.log('Hello');
//     next()
// })