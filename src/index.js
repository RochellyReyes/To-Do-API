const express = require('express');
const api = express();

//middleware functionality  
//https://expressjs.com/en/starter/static-files.html
// api.use((req, res, next) => {
//     console.log('Hello');
//     next()
// })
api.use(express.static(__dirname + '/public'));

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World to-do-api')
});







api.listen(3000, () =>{
    console.log(`API running on port 3000`)
});