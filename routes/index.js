var express = require('express');
var router = express.Router();

/* GET home page. */ ////solo para get
router.get('/', function(req, res) {
  ////dibuja el fichero index con titulo express
  res.render('index', { title: 'Quiz' });
});

//// exportan los middelware instalados, es lo que se instalara en la app
module.exports = router;
