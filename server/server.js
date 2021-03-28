require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');

require('dotenv').config();

const bodyParser = require('body-parser');

// console.log(process.env);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Config CORS
app.use(cors());

// parse application/json
// app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/usuaris', require('./routes/usuaris'));
app.use('/api/centres', require('./routes/centres'));
app.use('/api/alumnes', require('./routes/alumnes'));
app.use('/api/todo', require('./routes/cerques'));
app.use('/api/login', require('./routes/auth'));

mongoose
    .set("useCreateIndex", true)
    .set('useNewUrlParser', true)
    .set('useFindAndModify', false)
    .set('useUnifiedTopology', true)
    .connect(process.env.URLDB, (err, res) => {
        if (err) throw err;
        console.log("S'ha establert la connexió amb la base de dades");
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});