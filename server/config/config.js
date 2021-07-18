const { TokenExpiredError } = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;

// ========
//	PORT
// ========
process.env.PORT = process.env.PORT || 3000;

// =========
//	ENTORN
// =========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========
//	SEED
// =========

if (process.env.SEED) {
    process.env.SEED = process.env.SEED.toString('base64');
} else {
    process.env.SEED = 'seed-appescola';
}

// ================
//	CADUCITAT TOKEN
// ================
process.env.CADUCITAT_TOKEN = '30d';

// ============
//	BASE DADES
// ============
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/appescola';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============
//  JWT Token
// ============

process.env.JWT_SECRET = process.env.JWT_SECRET || 'a2l0o2c1seppa';

// ============
//  Cloudinary
// ============

cloudinary.config({
    cloud_name: 'appescola-img',
    api_key: '214177955299594',
    api_secret: 'JqzqnO_35f7f03sqiyV2mohz3mE'
});

cloudinary_URL = 'https://res.cloudinary.com/appescola-img/image/upload/v1617550969/';