const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuari = require('../models/usuari');
const Centre = require('../models/centre');

const loginNormal = async(req, res) => {

    console.log('hola login');
    let body = req.body;

    Usuari.findOne({ email: body.email }, (err, usuari) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: { message: 'No es troba el servidor' }
            });
        }

        if (!usuari) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuari o contrasenya incorrectes' }
            });
        }

        if (!bcrypt.compareSync(body.password, usuari.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuari o contrasenya incorrectes' }
            });
        }

        let token = jwt.sign({
            usuari: usuari
        }, process.env.SEED, { expiresIn: '30d' });

        res.json({
            ok: true,
            token: token,
            usuari
        });
    });
};

/*
exports.login = function (req, res){
	var email = req.body.email;
	var password = req.body.password;
	console.log('EMAIL: ' + email);
	console.log('PWD: ' + password);

	models.User.findOne({email: email})
	.populate('horari centre')
	.exec(function(error, user){
		if (error){
			console.log(error);
		}
		if(!user) {
			res.send("error login");
			//QUAN HI HAGI ESCOLES
			//next();
		}
		if(user) {
			//console.log('USER OK');
			if(bcrypt.compareSync(password, user.password)){
				//console.log('PWD OK');
				req.session.user = user;
				if(req.session.user.horari){
					var horariId = req.session.user.horari;
					models.Horari.find({_id: horariId}, function(err, horari){
						if(err){
							console.log(err);
						} else {
							if (user.mestre === "tutor"){
								res.send('/list');
							}
							if (user.mestre === "ee"){
								res.send('/list_EE');
							}
						}
					})
				} else {
					if (user.mestre === "tutor"){
						res.send('/list');
					}
					if (user.mestre === "ee"){
						res.send('/list_EE');
					}
				}
			} else {
				res.send("error login");
			}
		}
	});
};
*/

module.exports = {
    loginNormal
};