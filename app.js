const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB',
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
    .then((result) => app.listen(3000, () => { console.log("Server started on port 3000 and connected on testDB."); }))
    .catch((err) => { console.log(err); })

app.use(routes);

