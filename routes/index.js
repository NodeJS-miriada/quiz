var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller.js');

/* GET home page. */ ////solo para get
router.get('/', function(req, res) {
  ////dibuja el fichero index con titulo express
  res.render('index', { title: 'Quiz', errors:[] });
});

//// aqui tenemos las acciones asociadas a question/answer que se define en el controlador (quiz_controller.js)
//// dos rutas del interfaz get
//////router.get('/quizes/question', quizController.question);
//////router.get('/quizes/answer', quizController.answer);


// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show );
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizid(\\d+)', quizController.update);
router.delete('/quizes/:quizid(\\d+)', quizController.destroy); 

router.get('/author', function(req, res) {
  ////dibuja el fichero index con titulo express
  res.render('autores.ejs', { title: 'Quiz' });
});

//// exportan los middelware instalados, es lo que se instalara en la app
module.exports = router;
