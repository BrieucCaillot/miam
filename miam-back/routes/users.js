var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var router = express.Router();
var database = require('../services/database.js');

let myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

// router.get('/test', function (req, res, next) {
// 	if (sessionData != undefined) {
// 		res.json({
// 			sessionData: sessionData
// 		})
// 	} else {
// 		res.json({
// 			message: 'Not connected'
// 		})
// 	}
// });

// router.post('/logout', function (req, res, next) {
// 	if (sessionData != undefined) {
// 		sessionData = undefined
// 	}
// 	res.json({
// 		logout: true
// 	})
// });

router.post('/signin', function (req, res, next) {
	if (!req.body.id == "") {
		res.json({
			connected: true,
		})
	} else {
		let sql = 'SELECT `id`, `firstname`, `lastname`, `email`, `password` FROM `users` WHERE `email` LIKE "' + req.body.email + '";';
		database.sendQuery(sql, function (err, results) {
			if (err) throw err;
			if (results.length > 0) {
				if (req.body.password.length > 0) {
					bcrypt.compare(req.body.password, results[0].password).then((password) => {
						if (password === true) {
							console.log('Connexion worked out - Good password')
							res.json({
								type: 'success',
								connected: true,
								token: results[0].id,
								firstname: results[0].firstname,
								lastname: results[0].lastname,
								email: results[0].email,
							})
						} else if (password === false) {
							res.json({
								message: 'Le mot de passe est incorrect'
							});
						} else {
							res.json({
								message: 'L\'email rentré est incorrect'
							});
						}
					})
				} else {
					res.json({
						message: 'Vous devez rentrer un mot de passe'
					});
				}
			} else {
				res.json({
					message: 'L\'email rentré est incorrect'
				});
			}
		})
	}
});

router.post('/signup', function (req, res, next) {
	if (!req.body.id == "") {
		res.json({
			connected: true,
			message: 'Vous êtes déja inscrit ! 😊',
		})
	} else {
		let regExpEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
		let sql = 'SELECT * FROM `users` WHERE `email` LIKE "' + req.body.email + '";';
		database.sendQuery(sql, function (err, results) {
			if (err) throw err;
			if (results == 0) {
				if (req.body.email.length > 5 && req.body.email.match(regExpEmail)) {
					if (req.body.password === req.body.repassword) {
						if (req.body.lastname.length > 2 && req.body.firstname.length > 2) {
							let hash = bcrypt.hashSync(req.body.password, 10);
							let sql = "INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `createdAt`, `updatedAt`) VALUES ('" + req.body.firstname + "', '" + req.body.lastname + "', '" + req.body.email + "', '" + hash + "', '" + myDate + "' ,'" + myDate + "');"
							database.sendQuery(sql, function (err, results) {
								if (err) {
									console.log(err)
								} else {
									let sql = 'SELECT `id` FROM `users` WHERE `email` LIKE "' + req.body.email + '";';
									database.sendQuery(sql, function (err, results) {
										if (err) {
											console.log(err)
										} else {
											// req.session.token = results[0].id;
											res.json({
												type: 'success',
												message: 'Bravo, vous êtes maintenant inscrit ! 😊',
												connected: true,
												token: results[0].id,
												firstname: results[0].firstname,
												lastname: results[0].lastname,
												email: results[0].email,
											})
										}
									})
								}
							})
						} else {
							res.json({
								message: 'Le nom ou prénom renseigné n\'est pas valide'
							})
						}
					} else {
						res.json({
							message: 'Les mots de passes ne sont pas identiques'
						})
					}
				} else {
					res.json({
						message: 'L\'email rentré n\'est pas valide'
					})
				}
			} else {
				res.json({
					message: 'Email déja existant, vous pouvez vous connecter'
				})
			}
		})
	}
});

router.post('/modify', function (req, res, next) {
	if (!req.body.id == "") {
		let sql = "SELECT `password` FROM users WHERE id = '" + req.body.id + "' "
		database.sendQuery(sql, function (err, results) {
			if (err) {
				console.log(err)
			} else {
				if (bcrypt.compareSync(req.body.oldpassword, results[0].password)) {
					if (req.body.newpassword === req.body.renewpassword) {
						let hash = bcrypt.hashSync(req.body.newpassword, 10);
						let sql = 'UPDATE `users` SET `firstname` = "' + req.body.firstname + '", `lastname` = "' + req.body.lastname + '", `email` = "' + req.body.email + '", `password` = "' + hash + '", `updatedAt` = "' + myDate + '" WHERE `id` = "' + req.body.id  + '" ';
						database.sendQuery(sql, function (err, results) {
							if (err) {
								console.log(err)
							} else {
								res.json({
									type: 'success',
									message: 'Vos informations ont bien été modifiées 😁'
								})
							}
						})
					} else {
						res.json({
							type: 'error',
							message: 'Les nouveaux mots de passe ne sont pas identiques 🙁'
						})
					}
				} else {
					res.json({
						type: 'error',
						message: 'Votre ancien mot de passe ne correspond pas 🙁'
					})
				}
			}
		})
	} else {
		res.json('Nope')
	}
});

// router.get('/modify', function (req, res, next) {
// 	console.log(sessionData.token)
// 	if (sessionData != undefined) {
// 		let sql = 'SELECT * FROM `users` WHERE `id` = "' + sessionData.token + '";';
// 		database.sendQuery(sql, function (err, results) {
// 			if (err) {
// 				console.log(err)
// 			} else {
// 				res.json(results)
// 			}
// 		})
// 	} else {
// 		res.json('Nope')
// 	}
//
// });

router.post('/orders', function (req, res, next) {
	if (!req.body.id == "") {
		let sql = 'SELECT * FROM `orders` WHERE `userId` = "' + req.body.id + '";';
		database.sendQuery(sql, function (err, results) {
			if (err) {
				console.log(err)
			} else {
				res.json(results)
			}
		})
	} else {
		res.json('Nope')
	}
});

module.exports = router;
