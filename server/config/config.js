// ========
//	PUERTO
// ========
process.env.PORT = process.env.PORT || 3000;

// =========
//	ENTORNO
// =========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============
//	BASE DADES
// ============
let urlDB;

if(process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/appescola'
} else {
	urlDB = 'mongodb+srv://admin-appescola:cuysKtCASEa9rbNO@cluster0-bjqy6.mongodb.net/appescola'
}

process.env.URLDB = urlDB;