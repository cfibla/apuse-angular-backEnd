require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Routes
app.use(require('./routes/index'));

mongoose
	.set("useCreateIndex", true)
	.set('useNewUrlParser', true)
	.set('useFindAndModify', false)
	.set('useUnifiedTopology', true)
	.connect(process.env.URLDB, (err, res) => {
		if(err) throw err;
		console.log("S'ha establert la connexió amb la base de dades");
	});
 
app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
})