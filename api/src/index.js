const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes'); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(Router);

app.listen(8080, ()=>{
    console.log('Server is running on http://localhost:8080');
});