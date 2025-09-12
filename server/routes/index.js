var express = require('express');
const indexControllers = require('../controllers/indexControllers');
var router = express.Router();

/* GET home page. */
router.get('/', indexControllers.home);

module.exports = router;
