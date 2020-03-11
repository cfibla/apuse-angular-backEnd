const jwt = require('jsonwebtoken');

// ========================
// VERIFICA EL TOKEN
// ========================

let auth = (req, res, next) => {
	let token = req.get('token');

	jwt.verify(token, process.env.SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: "L'autenticació d'usuari no és valida"
				}
			})
		}

		req.usuari = decoded.usuari;

		next();
	})
}

// ========================
// VERIFICA ADMIN
// ========================

let adminRole = (req, res, next) => {

	let usuari = req.usuari;

	if (usuari.role != 'ADMIN_ROLE') {
		return res.status(401).json({
				ok: false,
				err: {
					message: "No teniu els permisos necessaris per realitzar la tasca"
				}
			})
	} else {
		next();
	}
}

// ========================
// VERIFICA SUPER
// ========================

let superRole = (req, res, next) => {

	let usuari = req.usuari;

	if (usuari.role != 'SUPER_ROLE') {
		return res.status(401).json({
				ok: false,
				err: {
					message: "No teniu els permisos necessaris per realitzar la tasca"
				}
			})
	} else {
		next();
	}
	
}

module.exports = {
	auth,
	adminRole,
	superRole
}