var express = require('express');
var session = require('express-session')
var router = express.Router();
var database = require('../services/database.js');

router.get('/all', function (req, res, next) {
	database.sendQuery('SELECT * FROM foodcategories', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

module.exports = router;