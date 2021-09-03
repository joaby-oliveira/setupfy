const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('./routes'); 
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'images')));

app.use(Router);

app.listen(8080, ()=>{
    console.log('Server is running on http://localhost:8080');
});