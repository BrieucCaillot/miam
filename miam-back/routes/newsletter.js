var express = require('express');
var session = require('express-session')
var nodemailer = require('nodemailer')
var moment = require('moment');
var router = express.Router();
var database = require('../services/database.js');

let myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASS
	}
});

router.post('/', function(req, res, next) {
	// console.log(req.body.email)
	let regExpEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
	let sql = 'SELECT `email` FROM `newsletters` WHERE `email` LIKE "' + req.body.email + '";';
	database.sendQuery(sql, function (err, results) {
		if (err) throw err
		if (results == 0) {
			if (req.body.email.length > 5 && req.body.email.match(regExpEmail)) {
				let sql = "INSERT INTO `newsletters` (`email`, `status`, `createdAt`, `updatedAt`) VALUES ('" + req.body.email + "', '" + 1 + "', '" + myDate + "' ,'" + myDate + "');"
				database.sendQuery(sql, function (err, results) {
					if (err) {
						console.log(err)
					} else {
						var mailOptions = {
							from: 'miam',
							to: req.body.email,
							subject: 'miam - Inscription newsletter',
							html: '<p>Bonjour Madame, Monsieur,</p><br><p>Vous êtes maintenant inscrit à la newsletter de miam 🥕</p><br><p>Cordialement, l\'équipe de miam 🖖</p>'
						};

						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								console.log(error);
							} else {
								res.json({
									title: 'Bravo 😁',
									type: 'success',
									message: 'Vous êtes maintenant inscrit à la newsletter'
								})
								console.log('Email sent: ' + info.response);
							}
						})
					}
				})
			}
		} else {
			res.json({
				title: 'Erreur 🙁',
				type: 'warn',
				message: 'Vous êtes déja inscris à la newsletter'
			})
		}
	})
})



module.exports = router;