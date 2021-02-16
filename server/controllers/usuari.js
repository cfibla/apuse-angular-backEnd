const express = require('express');
const { response } = require('express');

const bcrypt = require('bcryptjs');
const _ = require('underscore');

const { auth, adminRole, superRole } = require('../middlewares/autenticacio');

//const models = require('../models/index');
const Usuari = require('../models/usuari');
// const Centre = require('../models/centre');
const { generarJWT } = require('../helpers/jwt');

// GET
const getUsuaris = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    // Quan hi hagi +1 busqueda base dades, millor així

    const [usuaris, total] = await Promise.all([
        Usuari
        .find({}, 'nom cognom centre email role google estat')
        .skip(desde)
        .limit(10)
        .populate('centre'),

        Usuari.count()
    ]);

    // const usuaris = await Usuari.find({}, 'nom cognom centre email role google estat')
    //     .populate('centre');
    // const quants = await Usuari.countDocuments();

    res.json({
        ok: true,
        msg: 'Funció getUsuaris',
        usuaris,
        total
    });

};

// POST
const crearUsuari = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Falta comprovar el mail corporatiu
        // Falta comprovar que sinó és EE, el curs és obligatori

        const emailRepetit = await Usuari.findOne({ email });

        if (emailRepetit) {
            return res.status(400).json({
                ok: false,
                msg: "Ja existeix aquest correu electrònic a la base de dades"
            });
        }

        const usuari = new Usuari(req.body);

        // bcrypt
        const salt = bcrypt.genSaltSync();
        usuari.password = bcrypt.hashSync(password, salt);

        // Desa l'usuari
        await usuari.save();

        const token = await generarJWT(usuari.uid);

        res.json({
            ok: true,
            msg: "S'ha creat l'usuari",
            usuari,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No s'ha pogut contactar amb el servidor"
        });

    }

    /*
    //Comprova el mail de l'escola i, si no existeix, en crea una de nova
    let codiCentre = Centre.findOne({ email: user.escolamail }, (err, escola) => {

        //cal comprovar que el codi de l'escola tampoc estigui duplicat

        if (err) return console.log('Error buscant centre en la DB:', err.message);

        let usuari = new Usuari();

        function cercaEscola() {
            return new Promise(function(resolve, reject) {

                if (!escola) {
                    let centre = new Centre({
                        codi: user.escolacodi,
                        email: user.escolamail
                    });
                    centre.save((error, centreDB) => {
                        if (error) {
                            reject(console.log('Error en gravar centre en la DB:', error.message));
                        } else {
                            resolve(centreDB._id);
                        }
                    });
                } else {
                    resolve(escola._id);
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
                    usuari.estat = true;
                //usuari.role = user.role
                //lastLogin
                //horari

                usuari.save((err, usuariDB) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err: err.message
                        });
                    }

                    res.json({
                        ok: true,
                        usuari: usuariDB
                    });

                });
            })
            .catch(() => {
                console.log("Hi ha hagut un error en la gravació de l'usuari");
            });
    });

    */

};

// PUT
const editarUsuari = async(req, res = response) => {

    const uid = req.params.id;

    try {
        if (!uid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({
                ok: false,
                msg: 'El format de la ID no és valid'
            });
        }

        const usuariDB = await Usuari.findById(uid);

        if (!usuariDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuari inexistent',
            });
        }

        // TODO: Validar token i comprovar usuari role
        const token = await generarJWT(usuariDB.id);

        const { pasword, google, email, ...actualitzacions } = req.body;

        if (usuariDB.email !== email) {
            const existeixEmail = await Usuari.findOne({ email });
            if (existeixEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Aquest correu ja existeix a la base de dades'
                });
            }
        }

        actualitzacions.email = email;

        const usuariActualitzat = await Usuari.findByIdAndUpdate(uid, actualitzacions, { new: true });

        res.json({
            ok: true,
            usuari: usuariActualitzat
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No s'ha pogut actualitzar l'usuari"
        });
    }
    /*
        let id = req.params.id;
        //NOMÉS AGAFEM ELS CAMPS NECESSARIS DEL BODY
        let body = _.pick(req.body, ['nom', 'cognom', 'img', 'mestre', 'curs', 'centre']);

        Usuari.findByIdAndUpdate(id, body, { new: true, runValidators: true }, function(err, usuari) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err.message
                });
            }

            if (!usuari) {
                return res.status(400).json({
                    ok: false,
                    err: { message: 'Aquest usuari no existeix' }
                });
            }

            res.json({
                ok: true,
                usuari
            });
        });
        */
};

// DELETE
eliminarUsuari = async(req, res) => {

    let id = req.params.id;
    let estat = { estat: false };

    try {

        const usuariEliminat = await Usuari.findByIdAndUpdate(id, estat, { new: true });

        res.json({
            ok: true,
            usuariEliminat
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            err: { message: 'Aquest usuari no existeix' }
        });
    }

};


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

module.exports = {
    getUsuaris,
    crearUsuari,
    editarUsuari,
    eliminarUsuari
};