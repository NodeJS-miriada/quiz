// exportamos los metodos (logica de la aplicación)
// tienen que tener el mismo nombre que las rutas (routes/index.js) y que las vistas /quizes/answer.ejs y /quizes/question.ejs

// cada ruta que se define en el enrutador tiene una accion asociada
// y cada accion del controlador (GET,...) tiene una vista asociada

var models=require('../models/models.js');


// GET /quizes
exports.index = function(req,res) {
    models.Quiz.findAll().then(function(quizes) {
        res.render('quizes/index.ejs', { quizes:quizes });
    })
};

// GET /quizes/:id
exports.show=function(req,res) {
    console.log("**** "+req.params.quizId+"  ****");
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        res.render('quizes/show', {quiz: quiz});
    })
};

// GET /quizes/answer
exports.answer = function(req, res) {
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        if (req.query.respuesta === quiz.respuesta) {
            res.render('quizes/answer', { quiz: quiz, 
                                          respuesta: 'Correcto'});
        } else {
            res.render('quizes/answer', { quiz: quiz, 
                                          respuesta: 'Incorrecto'});
        }
    })
};


// GET /quizes
////exports.index = function(req,res) {
////    models.Quiz.findAll().then(function(quizes) {
////        res.render('quizes/index.ejs', { quizes:quizes });
////    })
////};


// GET para quizes/answer
////exports.answer=function(req,res){
////	models.Quiz.findAll().success(function(quiz){
////		resp=quiz[0].respuesta;
////		//if (rexExp.test(req.query.respuesta)){
////		if (req.query.respuesta===resp){
////			res.render('quizes/answer',{respuesta:"Correcta"});
////		}else{
////			res.render('quizes/answer',{respuesta:"Incorrecta"});
////		}
////	})	
////};


/* controlador para web  Primera version( la pregunta y resp estan en este fichero
	// GET para quizes/question
	exports.question=function(req,res){
		res.render('quizes/question',{pregunta:"Capital de Italia"});
	};

	// GET para quizes/answer
	exports.answer=function(req,res){
		rexExp=/^roma/i;	
		//if (req.query.respuesta==="Roma"){
		if (rexExp.test(req.query.respuesta)){
			res.render('quizes/answer',{respuesta:"Correcta"});
		}else{
			res.render('quizes/answer',{respuesta:"Incorrecta"});
		}
	};
*/
