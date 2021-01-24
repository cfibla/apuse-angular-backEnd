const express = require('express');
const app = express();

const { auth, adminRole, superRole } = require('../middlewares/autenticacio');


const Alumne = require('../models/alumne');
const Usuari = require('../models/usuari');
const Centre = require('../models/centre');

// GET alumnes USER_ROLE
app.get('/alumnes', auth, (req, res) => {

    Alumne
        .find({ centre: req.usuari.centre, curs: req.usuari.curs }, null, { sort: { cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1 } })
        .populate('centre', 'codi email')
        .exec(function(err, alumnes) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err.message
                });
            }

            //Comptar alumnes
            Alumne.countDocuments({ centre: req.usuari.centre, curs: req.usuari.curs }, (err, quants) => {
                res.json({
                    ok: true,
                    alumnes,
                    quants
                });
            });
        });
});

// GET alumnes ADMIN_ROLE
app.get('/alumnes-admin', [auth, adminRole], (req, res) => {


    Alumne
        .find({ centre: req.usuari.centre }, null, { sort: { cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1 } })
        .populate('centre', 'codi email')
        .exec(function(err, alumnes) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err.message
                });
            }

            //Comptar alumnes
            Alumne.countDocuments({ centre: req.usuari.centre }, (err, quants) => {
                res.json({
                    ok: true,
                    alumnes,
                    quants
                });
            });
        });

});

// GET alumnes SUPER_ROLE
app.get('/alumnes-super', [auth, superRole], (req, res) => {

    Alumne
        .find({}, null, { sort: { cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1 } })
        .populate('centre', 'codi email')
        .exec(function(err, alumnes) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err.message
                });
            }

            //Comptar alumnes
            Alumne.countDocuments({ centre: req.usuari.centre, curs: req.usuari.curs }, (err, quants) => {
                res.json({
                    ok: true,
                    alumnes,
                    quants
                });
            });
        });

});

// GET un alumne per ID
app.get('/alumne/:id', auth, (req, res) => {

    let id = req.params.id;

    Alumne
        .findById(id)
        .populate('centre', 'codi email')
        .exec(function(err, alumne) {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Aquest alumne no existeix a la base de dades"
                    }
                });
            }

            res.json({
                ok: true,
                alumne
            });

        });

});

// GET un alumne pel COGNOM (MILLORAR)
app.get('/alumne/recerca/:paraula', auth, (req, res) => {

    let paraula = req.params.paraula;
    let regex = new RegExp(paraula, 'i');

    Alumne
        .find({ cognomAlumne1: regex })
        .populate('centre', 'codi email')
        .exec(function(err, alumnes) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: "Aquest alumne no existeix a la base de dades"
                    }
                });
            }

            if (!alumnes) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Aquest alumne no hi és a la base de dades"
                    }
                });
            }

            res.json({
                ok: true,
                alumnes
            });

        });

});

// POST alumne
app.post('/alumne', auth, (req, res) => {

    const body = req.body;

    if (!body.nom || !body.cognom1 || !body.curs) {
        res.json('Falten camps obligatoris');
    }

    //MILLORAR ELS CHECKS
    const repetidor = body['radios.0'];
    const aill = body['checks.2'];
    const servSoc = body['checks.29'];

    let alumne = new Alumne({
        nomAlumne: body.nom,
        cognomAlumne1: body.cognom1,
        cognomAlumne2: body.cognom2,
        dataNaixement: body.naixement,
        seguretatSoc: body.sSocial,
        curs: body.curs,
        eeUsee: body.eeUsee,
        tutor: req.usuari._id,
        centre: req.usuari.centre
    });

    alumne.save(function(err, alumneDB) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err.message
            });
        }

        if (!alumneDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "L'alumne no s'ha gravat"
                }
            });
        }

        res.json({
            ok: true,
            alumne: alumneDB
        });
    });

    /*
//TODAY
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	let yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	today = dd+'/'+mm+'/'+yyyy;

	if(!body.naixement){
		body.naixement = new Date();
	};
*/

});

// PUT alumne
app.put('/alumne/:id', auth, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Alumne.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, alumneDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err.message
            });
        }

        if (!alumneDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Aquest alumne no existeix'
                }
            });
        }

        res.json({
            ok: true,
            alumne: alumneDB
        });
    });
});

// DELETE alumne
app.delete('/alumne/:id', auth, (req, res) => {

    let id = req.params.id;
    let estat = { estat: false };

    Alumne.findByIdAndUpdate(id, estat, { new: true }, function(err, alumne) {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err.message
            });
        }

        if (!alumne) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Aquest alumne no existeix'
                }
            });
        }

        res.json({
            ok: true,
            alumne,
            message: "Dades eliminades"
        });
    });
});



module.exports = app;

/*
let models = require('../models/index');

//Llstat d'alumnes - GET
exports.list = function (req, res) {
	console.log('LIST');
	models.Alumne.find({
		centre: req.alumne.centre,
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, docs){
		if (error){
			console.log(error);
		} else {
			if(req.session.user.horari){
				console.log('LIST TIENE HORARI');
				horariId = req.session.user.horari;
				models.Horari.find({_id: horariId}, function(err, horariUser){
					if(err){
						console.log(err);
					} else {
						res.render('index',{Alumnes: docs, horari: horariUser});
					}
				});
			} else {
				res.render('index',{Alumnes: docs});
			}
		}
	});

};

//Altes d'alumnes - POST
exports.create = function (req, res){

	var scola = req.session.user.centre;

	var alum = req.body;
	var rep = alum['radios.0'];
	var aill = alum['checks.2'];
	var sersoc = alum['checks.29'];

	if (!alum.nom||!alum.cognom1||!alum.curs){
		res.json('Alguns camps són obligatoris')
	} else {
		models.Alumne.find(function(error, alumne){
			if (error){
				console.log('error: '+ error);
			} else {
			//TODAY
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
					dd='0'+dd
				} 
				if(mm<10) {
					mm='0'+mm
				} 
				today = dd+'/'+mm+'/'+yyyy;

				if(!alum.naixement){
					alum.naixement = new Date();
				};

				var nouAlumne = new models.Alumne({
					nomAlumne: alum.nom,
					cognomAlumne1: alum.cognom1,
					cognomAlumne2: alum.cognom2,
					dataNaixement: alum.naixement,
					seguretatSoc: alum.sSocial,

					codialumneola: req.session.user.centre._id,
					curs: alum.curs,
					eeUsee: alum.eeUsee,

					tutor: req.session.user,
					centre:req.session.user.centre,

					assist: [{
						date: today,
						mati: null,
						tarda: null,
						dataIso: new Date()
					}],
					checks: [false, false, aill, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, sersoc, 
					false, false, false, false, false],

					radios: [rep, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false, 
					false, false, false, false, false],

					observacions: "",
					mailAlum: "",
					passwordAl: "",
					telefon: "",
					altresEsp: "",
					atServPrivats: "",
					percentDim: "",
					motiuDic: "",
					anyVal: "",
					derivacio: "",
					motiuDer: ""

				});
				nouAlumne.save(function(error){
					if (error) {
						return res.json(error);
					} else{
						return res.json(nouAlumne);
					}
				});
			};
		});
	}
};


//Modificar dades - PUT
exports.update = function (req, res){

	var alumneId = req.params.id;
	var alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId,
									{$set:{
										'checks':[],
										'radios':[]},
										altresEsp:'',
										atServPrivats:'',
										percentDim:'',
										motiuDic:'',
										anyVal:'',
										derivacio:'',
										motiuDer:'',


									}, function(error, alumne){
										if (error){
											return res.json(error);
										}
									});

	delete alum.id;
	delete alum._id;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.json({type:true, Alumne: JSON.stringify(alumne)});
		}
	});
};

//Suprimir alumne - DELETE
exports.suprD = function (req, res) {

	var alumneId = req.params.id;
	models.Alumne.findByIdAndRemove(alumneId, function(error, alumne){
		if (error){
			return res.json(error);
		} else {
			res.redirect('/list');
			}
	});
};


//REUNIONS PARES GET
exports.reunioGet = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId)
	.populate('centre')
	.exec(function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('reunions_pares', {alumne: alumne, page_name:''});
		}
	});
};


*/