var path = require('path');

///// --Como no funciona en heroku ersto no hace falta 
/////// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
/////// SQLite   DATABASE_URL = sqlite://:@:/
/////var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
/////var DB_name = (url[6]||null);
/////var user    = (url[2]||null);
/////var pwd     = (url[3]||null);
/////var protocol= (url[1]||null);
/////var dialect = (url[1]||null);
/////var port    = (url[5]||null);
/////var host    = (url[4]||null);
/////var storage = process.env.DATABASE_STORAGE;
/////
/////// Cargar Modelo ORM
/////var Sequelize = require('sequelize');
/////
/////// User BBDD SQLite o Postgres
/////var sequelize = new Sequelize(DB_name, user, pwd,
/////                        { dialect: dialect, 
/////                          protocol: protocol,
/////                          port: port,
/////                          host: host,
/////                          storage: storage, // solo SQLite (.env)
/////                          omitNull: true    // solo Postgres
/////                        }
/////                    );

var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null,null, null, 
  { dialect:  "sqlite", storage:  "quiz.sqlite"}      
);

// Importar definicion de la tabla Quiz
////var quiz_path = path.join(__dirname,'quiz');
////var Quiz = sequelize.import(quiz_path);
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; 

sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  console.log("==================================="); 
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
        Quiz.create( 
           {pregunta: 'Capital de Italia',   respuesta: 'Roma',tema:'ocio'}
        );
        Quiz.create( 
           {pregunta: 'Capital de Portugal',   respuesta: 'Lisboa',tema:'ocio'}
        ).then(function(){console.log('\nBase de datos (tabla quiz NO HEROKU, solo local) inicializada')});
    }else{
      console.log('\nBase de datos (tabla quiz) ya existe \n (tabla quiz NO HEROKU, solo local)')
    };
  });
});

