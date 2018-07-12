var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var moment = require('moment');
var router = express.Router();
var database = require('../services/database.js');
var stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

let myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

router.post('/', function (req, res, next) {
	let stripeToken = req.body.stripeToken;
	let time = req.body.time.split("h").join(':')
	let sql = "SELECT `id`, `email` FROM `users` WHERE `id` LIKE '" + req.body.token + "';"
	database.sendQuery(sql, function (err, results) {
		if (err) throw err;
		if (results.length > 0) {
			console.log(stripe.customers.list)
			stripe.customers.create({
				email: results[0].email
			}).then((customer) => {
				return stripe.customers.createSource(customer.id, {
					source: 'tok_visa'
				})
				console.log('customer', customer)
			}).then((source) => {
				console.log('source', source)
				let response = stripe.charges.create({
					amount: req.body.totalPrice.split(".").join(''),
					currency: 'eur',
					description: 'Example charge',
					source: stripeToken,
				}).then((charge) => {
					console.log('status', charge.status)
					if (charge.status == 'succeeded') {
						let sql = "SELECT `id`, `email` FROM `users` WHERE `id` LIKE '" + req.body.token + "';"
						database.sendQuery(sql, function (err, results) {
							if (err) throw err;
							if (results.length > 0) {
								let sql = "INSERT INTO orders (userId, price, status, address, time, createdAt, updatedAt) VALUES ('" + req.body.token + "', '" + req.body.totalPrice + "', 1, '" + req.body.address.replace("'", "''") + "', '" + moment(new Date()).format("YYYY-MM-DD") + " " + time +  "', '" + myDate +  "', '" + myDate +  "');"
								database.sendQuery(sql, function (err, results) {
									if (err) {
										console.log(err)
									} else {
										console.log(results)
									}
								})
							} else {
								res.json({
									title: 'Erreur 🙁',
									type: 'warn',
									message: 'Une erreur est survenue',
								})
							}
						})
						res.json({
							title: 'Bravo 😁',
							type: 'success',
							message: 'Le paiement a été effectué avec succés'
						})
					} else {
						res.json({
							title: 'Erreur 😁',
							type: 'error',
							message: 'Le paiement a été effectué avec succés'
						})
					}
				})
			}).catch(function (err) {
				console.log(err)
				res.json({
					message: err
				})
			});
		} else {
			res.json({
				title: 'Erreur 🙁',
				type: 'warn',
				message: 'Une erreur est survenue',
			})
		}
	})
});

module.exports = router;
