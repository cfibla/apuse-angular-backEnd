//REUNIONS POST
exports.reunioPost = function (req, res) {
	var alumneId = req.params.id;
	var alum = req.body;
	models.Alumne.findByIdAndUpdate(alumneId, alum, {new: true, safe: true, upsert: true},
	function (error, alumne){
		if (error) res.json(error);
		res.json(alumne);
	});

}

//REUNIONS UPDATE
exports.reunioUpdate = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;
	var alum = req.body;

	models.Alumne.findByIdAndUpdate(alumneId, alum, {multi: true, safe: true, upsert: true},

	function (error, alumne){
		if (error) {
			res.json(error);
		} else{
			res.json(alumne);
		}
	});

}

//REUNIONS DELETE
exports.reunioDel = function (req, res) {
	var alumneId = req.params.id;
	var alumneI = req.params.i;

	models.Alumne.findOne({_id: alumneId}, function (error, alumne){
		if (error) res.json(error);
		alumne.reunionsPares.splice(alumneI,1);
		alumne.save(function(error){
			if (error) {res.json(error);
		} else{
			res.render('reunions_pares', {alumne: alumne, page_name:''});
		};
		});

	});
};
