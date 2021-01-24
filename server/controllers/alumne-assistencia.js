
// FALTEN REQUIRES, ETC


//Assistència d'alumnes - GET
exports.assisGet = function (req, res) {

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
			res.render('assistencia',{Alumnes: alumnes, DataV: today});
			}
	});

};

//Assistència d'alumnes - POST
exports.assisPost = function (req, res) {
	var alum = req.body;
	var alumI = alum.i;

	function queryAssist(index,callback){
		if (index < alumI){
			var alumneId = alum['alumneId.'+index];
			var alumArray = alum['arraylng.'+index];
			var alumDate = alum['assist.date.'+index];
			var alumMati = alum['assist.mati.'+index];
			var alumTarda = alum['assist.tarda.'+index];

			var alumAssist = {};
			alumAssist['date']= alumDate;
			alumAssist['mati']= alumMati;
			alumAssist['tarda'] = alumTarda;

			if (!alumAssist['dataIso']){
				//TO ISODATE
				darr1 = alumDate.split("/");    // ["29", "1", "2016"]
				var dataI = new Date(parseInt(darr1[2]),parseInt(darr1[1])-1,parseInt(darr1[0]));
				                         // Date {Fri Jan 29 2016 00:00:00 GMT+0530(utopia standard time)
				//var data1Iso = data1.toISOString();
				//var data1IsoFull = 'ISODate("'+ data1Iso +'")';
				                         //2016-01-28T18:30:00.000Z
				alumAssist['dataIso'] = dataI;
			}
			//ELIMINA ASSIST amb mateixa data
			models.Alumne.findByIdAndUpdate(alumneId, {$pull: {assist:{date: alumDate}, $push: {assist: alumAssist}}},{multi: true},
				function (error, pullalumne){
					if (error){
						res.json(error);
					} else {
						console.log('DATA BORRADA '+alumneId+ ": " +alumDate);
						//UPDATE ASSIST
						models.Alumne.findByIdAndUpdate(alumneId, {$push: {assist: alumAssist}},{multi: true},
							function (error, pushalumne){
								if (error) res.json(error);
								console.log('ALUMASSIST UPDATE '+alumneId+ ": " + JSON.stringify(alumAssist));
						});
					}
				}
			);
			console.log('IF '+index);
			queryAssist(index+1, callback);
		} else {
			callback();
			console.log('ELSE');
		}
	}
	queryAssist(0, function(){
		console.log('PRE ASSISTENCIA');
		setTimeout(function(){ res.redirect('/assistencia'); }, 3000);
		
		console.log('POST ASSISTENCIA');
	})
};


//Assistència DATA
exports.assisData = function (req, res) {

	var dataA = req.body.dataAssis;

	models.Alumne.find({
		centre: req.session.user.centre,
	
		curs: req.session.user.curs}
		, null, {sort: {cognomAlumne1: 1, cognomAlumne2: 1, nomAlumne: 1}})
	.populate('centre tutor')
	.exec(function(error, alumnes){
		if (error){
			console.log(error);
		} else {
			res.render('assistencia',{Alumnes: alumnes, DataV: dataA});

		}
	});
};


//IMPRIMIR ASSISTÈNCIA ENTRE 2 DATES - GET
exports.assisAlumne = function (req, res) {
	var alumneId = req.params.id;
	models.Alumne.findById(alumneId, function(error, alumne){
		if (error) {
			return res.json(error);
		} else {
			res.render('assistAlumne', {alumne: alumne});
		}
	});
};				
