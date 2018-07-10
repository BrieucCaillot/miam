var express = require('express');
var session = require('express-session')
var router = express.Router();
var multer = require('multer');
var database = require('../services/database.js');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

var fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

var upload = multer(
	{
		storage: storage,
		limits: {
			fileSize: 1024 * 1024 * 5
		},
		fileFilter: fileFilter
	}
)


router.post('/create', upload.single('foodImage'), function (req, res) {
	let sql = "INSERT INTO foods (foodCategoryId, image, name, description, subdescription, price, available, quantity, createdAt, updatedAt)VALUES (3, '" + req.file.filename + "', '" + req.body.name + "', '" + req.body.description + "', '" + req.body.subdescription + "', " + req.body.price + ", 1, 10, '2018-06-08 13:00:00', '2018-06-10 15:00:00');";
	database.sendQuery(sql, function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
})

router.get('/all', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods WHERE quantity > 0 AND available = 1;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/1', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 1;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/2', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 2;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/3', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 3;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/4', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 4;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/5', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 5;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

router.get('/6', function (req, res, next) {
	database.sendQuery('SELECT * FROM foods f LEFT JOIN images im ON im.foodsId = f.id WHERE f.foodCategoryId = 6;', function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.json(results)
		}
	})
});

module.exports = router;
