
//Menjador - GET
exports.menjaGet = function (req, res) {

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

	models.Alumne.find({
		centre: req.session.user.centre,
	
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('menjador',{Alumnes: alumnes, DataVM: today});
			}
	});
};
//Menjador - POST
exports.menjaPost = function (req, res) {

	var alum = req.body;
	var alumI = alum.i;

	for (var i =0; i < alumI; i ++) {
		var alumneId = alum['alumneId.'+i];
		var alumArray = alum['arraylng.'+i];

		var alumDateM = alum['menjador.dataMen.'+i];
		var alumMenu = alum['menjador.menu.'+i];
		

		var alumMenjador = {};

		alumMenjador['dataMen']= alumDateM;
		alumMenjador['menu']= alumMenu;
	
		if (!alumMenjador['dataIsoMen']){

			//TO ISODATE

			darr1 = alumDateM.split("/");    // ["29", "1", "2016"]
			var dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
			alumMenjador['dataIsoMen'] = dataI;
		}
		//ELIMINA menjador amb mateixa data
		models.Alumne.findByIdAndUpdate(alumneId, {$pull: {menjador:{dataMen: alumDateM}}},{multi: true},
		function (error, alumne){
		if (error) res.json(error);
		});

		//UPDATE menjador
		models.Alumne.findByIdAndUpdate(alumneId, {$push: {menjador: alumMenjador}},
		function (error, alumne){
			if (error) res.json(error);
		});
	};
		res.redirect('/menjador');
};


//Menjador DATA
exports.menjaData = function (req, res) {

	var dataM = req.body.dataMenja;

	models.Alumne.find({
		centre: req.session.user.centre,
	
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('menjador',{Alumnes: alumnes, DataVM: dataM});

		}
	});
};


//Menjador - IMPRIMIR ASSISTÈNCIA ENTRE 2 DATES - GET
exports.menjaAlumne = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('assistAlumne', {alumne: alumne});
		}
	});
};
