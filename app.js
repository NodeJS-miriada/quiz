var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); // importados desde el servidor 
										// al hacer npm install (no estan en express)
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials= require('express-partials'); // para utilizara layouts y solo cambiar las visatas dentro de section

var routes = require('./routes/index');  // importamos los enrutadores

var app = express();	// creamos la aplicación

// view engine setup
app.set('views', path.join(__dirname, 'views'));// une directorio actual con views (genera el path absoluto)
app.set('view engine', 'ejs');		// generador de vistas que utiliza rubi & race
									// que es mas claro que el que pone express
									// que se llama jade

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(partials());


////middelwares asociados a lo que hemos importado
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

////static viene de serie desde la version 4 por eso no se importa
//// se ha instalado con .use pero se instala con get ¿?
app.use(express.static(path.join(__dirname, 'public')));

////middelwares sobre los que generamos la logica de nuestra aplicacion
app.use('/', routes);		//   

//middelware que se ejecutara para cualquier ruta que no sea "/" o "/users"
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);  		//siguiente middleware (sera el de error de desarrollo si esta instalado)
});

// error handlers

// development error handler (solo se instala si estamos en desarrollo, es decir en local)
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);	// pone render.status si existe sino pone 500
        res.render('error', {           // llama a views error.ejs
            message: err.message,		//llena el parametro <%=message %> de error.ejs
            error: err					// llena error.status y error.stack de error.ejs
										// error: err es +todo el stack de error
        });
    });
}

//// ejs son enmbebeded javascript
//// y el javascript se pone <% ... codigo... %>
//// y las expresiones javascript se pone <% =expresion %>
////    hay que escapar los codigos conflictivos para evitar inyeccion de codigo
////	<=&lt, >=&gt, &=&amp  ¿algún modulo lo hara?
//// y las expresiones javascript se pone <% -expresion %>
////    no hace falta tratar caracteres especiales ya que entra todo y eso es peligroso
////	porque las cadenas pueden venir del exterior y ejecutar cualquier codogio

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
