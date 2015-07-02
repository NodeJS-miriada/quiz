var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller.js');

/* GET home page. */ ////solo para get
router.get('/', function(req, res) {
  ////dibuja el fichero index con titulo express
  res.render('index', { title: 'Quiz' });
});

//// aqui tenemos las acciones asociadas a question/answer que se define en el controlador (quiz_controller.js)
//// dos rutas del interfaz get
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

//// exportan los middelware instalados, es lo que se instalara en la app
module.exports = router;
