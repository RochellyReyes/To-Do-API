const express = require('express');

const api = express();
api.listen(3000, () =>{
    console.log(`API running on port 3000`)
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World to-do-api')
});