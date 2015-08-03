// exportamos los metodos (logica de la aplicación)
// tienen que tener el mismo nombre que las rutas (routes/index.js) y que las vistas /quizes/answer.ejs y /quizes/question.ejs

// cada ruta que se define en el enrutador tiene una accion asociada
// y cada accion del controlador (GET,...) tiene una vista asociada

var models=require('../models/models.js');

////Según la version ser "find" o "findById", en mi caso find
////models.Quiz.findById(quizId).then( function(quiz) {

exports.load = function(req,res, next, quizId) {
    models.Quiz.find(quizId).then( function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId = ' + quizId));
            }
        }
    ).catch(function(error) { next(error); });
};

 // GET /quizes
 exports.index = function(req,res) {
    models.Quiz.findAll()
        .then(function(quizes) {
            res.render('quizes/index.ejs', { quizes:quizes, errors:[] });
     }).catch(function(error) { next(error);});
 };
 
////// GET /quizes
////exports.index = function(req,res) {
////    swhere = req.query.search.replace(/\s{1,}/g,"%");
////    models.Quiz.findAll({where: ["pregunta like ?","%"+swhere+"%"]})
////        .then(function(quizes) {
////            res.render('quizes/index.ejs', { quizes:quizes, errors:[] });
////     }).catch(function(error) { next(error);});
//// };

// GET /quizes/:id
exports.show=function(req,res) {
    ////console.log("**** "+req.params.quizId+"  ****");
    ////models.Quiz.find(req.params.quizId).then(function(quiz) {
        res.render('quizes/show', {quiz: req.quiz, errors:[]});
    ////})
};

// GET /quizes/answer
exports.answer = function(req, res) {
    ////    models.Quiz.find(req.params.quizId).then(function(quiz) {
    ////        if (req.query.respuesta === quiz.respuesta) {
    ////            res.render('quizes/answer', { quiz: quiz, 
    ////                                          respuesta: 'Correcto'});
    ////        } else {
    ////            res.render('quizes/answer', { quiz: quiz, 
    ////                                          respuesta: 'Incorrecto'});
    ////        }
    ////    })
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, 
                                  respuesta: resultado , errors:[]});    
};


// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build( //creamos el objeto quiz
        {pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro" }
    );
    res.render('quizes/new', { quiz: quiz, errors:[] });
};

// POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );

    quiz.validate().then( function(err) {
        if (err) {
            res.render('quizes/new', {quiz: quiz, errors: err.errors});
        } else {
            // guarda en BD los campos
            quiz.save({fields:["pregunta","respuesta","tema"]}).then(function() {
                res.redirect('/quizes');
            });
        }
    });
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz;  //autoload de la instancia quit
    res.render('quizes/edit', { quiz: quiz, errors:[] });
};

// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;

    req.quiz.validate().then( function(err) {
        if (err) {
            res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
        } else {
            // guarda en BD los campos
            req.quiz.save({fields:["pregunta","respuesta","tema"]}).then(function() {
                res.redirect('/quizes');
            });
       }
    }).catch(function(error) {next(error)});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch( function(error) {next(error)}); 
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
