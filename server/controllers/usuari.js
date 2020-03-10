const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuari = require('../models/usuari');
const Centre = require('../models/centre');

const {auth, adminRole, superRole} = require('../middlewares/autenticacio')

const app = express();
//const models = require('../models/index');

//GET
app.get('/usuaris', [auth, superRole], function (req, res) {

	Usuari.find()
		.exec((err, usuaris) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err: err.message
				})
			}

			//Comptar usuaris
			Usuari.countDocuments({}, (err, quants) => {
				res.json({
					ok: true,
					usuaris,
					quants
				});
			});
		});
});

// POST
app.post('/usuari', function (req, res) {

	let user = req.body;

	if (!user.email ||
		!user.nom ||
		!user.cognom ||
		!user.password ||
		!user.mestre ||
		!user.escolacodi ||
		!user.escolamail) {
			res.json("Falten dades obligatòries");
	}

	//Comprova el mail de l'escola i, si no existeix, en crea una de nova
	let codiCentre = Centre.findOne({email:user.escolamail}, (err, escola) => {

		if (err) return console.log ('Error buscant centre en la DB:', err.message);

		let usuari = new Usuari();
	
		function cercaEscola() {
		    return new Promise(function(resolve, reject) {

			    if (!escola) {
					let centre = new Centre({
						codi: user.escolacodi,
						email: user.escolamail
					});
					centre.save ((error, centreDB) => {
						if (error) {
							reject (console.log ('Error en gravar centre en la DB:', error.message));
						} else {
							resolve (centreDB._id);
						}
					});
				} else {
					resolve (escola._id);
				}
		    });
		}

		cercaEscola()
			.then((centre) => {

				usuari.email = user.email,
				usuari.password = bcrypt.hashSync(user.password, 10),
				usuari.nom = user.nom,
				usuari.cognom = user.cognom,
				usuari.mestre = user.mestre,
				usuari.curs = user.curs,
				usuari.centre = centre,
				usuari.estat = true
				//usuari.role = user.role
				//lastLogin
				//horari

				usuari.save ((err, usuariDB) => {

					if (err) {
						return res.status(500).json({
							ok: false,
							err: err.message
						})
					}

					res.json({
						ok: true,
						usuari: usuariDB
					})

				})
			})
			.catch(() => {
			    console.log("Hi ha hagut un error en la gravació de l'usuari");
			});
	});
//ENVIAR USER_ROLE
//COMPROVAR QUE SINÓ ÉS EE, EL CURS ÉS OBLIGATORI
// FALTA LOGIN
});

// PUT
app.put('/usuari/:id', auth, function (req, res) {

	let id = req.params.id;
	//NOMÉS AGAFEM ELS CAMPS NECESSARIS DEL BODY
	let body = _.pick(req.body, ['nom', 'cognom', 'img', 'mestre', 'curs', 'centre']);

	Usuari.findByIdAndUpdate(id, body, {new: true, runValidators: true}, function (err, usuari){

		if (err) {
			return res.status(500).json({
				ok: false,
				err: err.message
			})
		}

		if (!usuari) {
			return res.status(400).json({
				ok: false,
				err: {message: 'Aquest usuari no existeix'}
			})
		}

		res.json({
		  	ok: true,
		  	usuari
		});
	});
});

//DELETE
app.delete('/usuari/:id', auth, function (req, res) {

  let id = req.params.id;
  let estat = {estat: false}

	Usuari.findByIdAndUpdate(id, estat, {new: true}, function (err, usuari){

		if (err) {
			return res.status(500).json({
				ok: false,
				err: err.message
			})
		}

		if (!usuari) {
			return res.status(400).json({
				ok: false,
				err: {message: 'Aquest usuari no existeix'}
			})
		}

		res.json({
		  	ok: true,
		  	usuari
		});
	});

});

module.exports = app;


/*
// Nou user GET
exports.nouUser = function(req, res) {
		res.render('nou_usuari', {errorAlta:""});
	};

// Nou user POST
exports.createUser = function (req, res){
	
};

//GET USER / USER-EE PROFILE 
exports.profile = function (req, res){

	var userId = req.session.user._id;
	var msg =  req.flash('passwordMsg');
	
	models.User.findById(userId, function(error, usuari){
		if (usuari) {
			res.render('usuari', {usuari: usuari, passwordMsg: msg});
		}
		if (!usuari) {
			models.UserEe.findById(userId, function(error, usuari){
			if (error) {
				return res.json(error);
			} else {
				res.render('usuari', {usuari: usuari,  passwordMsg: msg});
			}
			});
		};
	});
};

//UPDATE user profile
exports.update = function (req, res){

	var userId = req.params.id;
	var usuari = req.body;

	models.User.findByIdAndUpdate(userId, usuari, {new: true, safe: true, upsert: true},
	function (error, usuari){
		if (error) {
			return res.json(error);
		} else {
			res.redirect('/usuari');
		}
	});
};
//UPDATE contrasenya - GET
exports.updPwdGet = function (req, res){
	var msg =  req.flash('passwordMsg');
	res.render('contrasenya', {passwordMsg: msg});
}

//UPDATE contrasenya - POST
exports.updPwdPost = function (req, res){
	var pwd = req.body;
	var userId = req.session.user._id;

	if(pwd.password1 != pwd.password2){
		req.flash('passwordMsg', 'Les dues contrasenyes no coincideixen');
		res.redirect('/contrasenya');
	} else {
		models.User.findOne({_id:userId}, function(error, user){
			if (error){
				res.json(error);
			} else {
				user.password = bcrypt.hashSync(pwd.password1, 10);
				user.save(function (error, user){
					if (error) {
						res.json(error);
					} else {
						req.flash('passwordMsg', 'La vostra contrasenya ha estat canviada');
						res.redirect('/usuari');
					}
				});
			}
		});
	}
}

//DELETE user
exports.delUser = function (req, res) {
	var userId = req.params.id;
	models.User.findByIdAndRemove(userId, function(error, user){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/');
		}
	});
};
*/

module.exports = app;

