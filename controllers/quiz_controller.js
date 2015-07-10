// exportamos los metodos (logica de la aplicación)
// tienen que tener el mismo nombre que las rutas (routes/index.js) y que las vistas /quizes/answer.ejs y /quizes/question.ejs

// cada ruta que se define en el enrutador tiene una accion asociada
// y cada accion del controlador (GET,...) tiene una vista asociada



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
	
