import express from 'express';
import GamesRoute from './routes/games.js';
import GamesVotesRoute from './routes/gamesVotes.js';
import JudgesRoute from './routes/judges.js';

// import path from 'node:path';

//Creamos el servidor
const app = express();

// //Ejecutamos el middleware indicandole donde se encuentran los contenidos estaticos
// app.use(express.static('public'));
// //para avisarle a express cada vez que venga algo en url encode lo parsee a objeto y asi puede interpretarlo(siempre q venga en urlencoded)
// app.use(express.urlencoded({extended: true}));

// //Aca van todas las funciones que queremos que sean dinamicas:
//     //asi obtenemos todo lo que viene del get
//     //GET
// app.get('/form', function(req,res){
//     let nombre = req.query.nombre;
//     res.send(`Hola ${nombre}`);
// });
// //POST
// app.post('/form', function(req,res){
//     let nombre = req.body.nombre;
//     res.send(`Hola ${nombre}`);
// });

app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(GamesRoute);
app.use(GamesVotesRoute);
app.use(JudgesRoute);


// let games = [];
// //POST

// app.post('/games', function(req,res){
//     let games = [];

//     const game = {
//         name: req.body.name,
//         genre: req.body.genre,
//         members: req.body.members,
//         edition: req.body.edition
//     }

//      fs.readFile("data/games.json", {encoding: "utf-8"})
//     .then(function(data){
//         //aca se ejecuta una vez terminado de leer
//         games = JSON.parse(data);
//         game.id = games[games.length - 1].id + 1;
//         games.push(game);

//         //guardo en disco:
//          return fs.writeFile("data/games.json", JSON.stringify(games), {encoding: "utf-8"});
//     })
//     .then(function(){
//         // status 201 es el creado
//         res.status(201).json(game);
//     })
//     .catch(function(err){
//         res.status(500).json({msg: "No se pudo guardar el juego"});
//     })

//     //aca se ejecuta mientras esta aún leyendo


// })

// //PUT (reemplaza)

// app.put('/games/:idGame', function(req,res){
//     //obtengo el id del juego
//     const {idGame} = req.params;
//     //preparo el objeto
//     const game = {
//         name: req.body.name,
//         genre: req.body.genre,
//         members: req.body.members,
//         edition: req.body.edition
//     }

    
//      fs.readFile("data/games.json", {encoding: "utf-8"})
//     .then(function(data){
 
//         const games = JSON.parse(data);
        
//         //busco el objeto
//         let indexGame = -1;

//         //busco el indice del objeto que estoy buscando en el array
//         for(let i = 0; i < games.length; i++){
//         if(games[i].id ==  idGame){
//                 indexGame = i;
//             }
//         }

//         if(indexGame != -1) {
//             //reemplazo el objeto
//             games[indexGame] = {
//                 ...game, //spread operator: se usa cuando no sabes cuantos parametros va a tener, entonces le decis aca va haber parametros(sin especificar cuantos)
//                 id: games[indexGame].id
    
//             }
//            //guardo en disco:
//             return fs.writeFile("data/games.json", JSON.stringify(games), {encoding: "utf-8"});
//         }else{
//             //todo lo que mande por el throw va a ir al catch
//             throw {code: 404, msg: "No se encuentra este juego"}
//         }
        
//     })
//     .then(function(){
//         // status 201 es el creado
//         res.status(201).json(game);
//     })
//     .catch(function(err){
//         if(err?.code){
//             res.status(err.code).json({msg: err.msg});
//         }
//         res.status(500).json({msg: "No se pudo guardar el archivo"});
//     })
   
// })

// //patch (actualiza)

// app.patch('/games/:idGame', function(req,res){
   
//     //obtengo el id del juego
//     const {idGame} = req.params;

//     //preparo el objeto
//     const game = {};

//     if(req.body.name){
//         game.name = req.body.name;
//     }

//     if(req.body.genre){
//         game.genre = req.body.genre;
//     }
    
//     if(req.body.members){
//         game.members = req.body.members;
//     }
    
//     if(req.body.edition){
//         game.edition = req.body.edition;
//     }

//     games.push(game);
//     console.log(games);
//     //busco el objeto
//     let indexGame = -1;

//     for(let i = 0; i < games.length; i++){
//         if(games[i].id == idGame){
//             indexGame = i;
//         }
//     }
    
//     if(indexGame != -1) {
//         //reemplazo el objeto
//         games[indexGame] = {
//             ...games[indexGame], //va aescribir todo lo que tiene el juego(nombre y descripcion)
//             ...game, //reemplaza el nombre o descripcion en caso de que haya para reemplazar 
//             id: games[indexGame].id //forzar el id que tiene originalmente para que no se reemplace

//         }

//         res.status(200).json(games[indexGame]);
//     }else{
//         res.status(404).json({msg: `El juego #${idGame} no existe`});
//     }
// })


// //DELETE... (eliminar)
// // eliminacion logica (la mas normal de usar)
// // eliminacion fisica (definitiva)

// app.delete('/games/:idGame', function(req,res){
    
//     //obtengo el id del game
//     const {idGame} = req.params;

//     //busco el objeto
//     let indexGame = -1;

//     for(let i = 0; i < games.length; i++){
//         if(games[i].id == idGame){
//             indexGame = i;
//         }
//     }
    
//     if(indexGame != -1) {
//         // creamos una propiedad llamada deleted para indicar que el objeto esta eliminado 
//         games[indexGame].deleted = true; 

//         res.status(200).json(games[indexGame]);
//     }else{
//         res.status(404).json({msg: `El juego #${idGameindexGame} no existe`});
//     }
// })


//Escuchamos un puerto
app.listen(2024, function () {
    console.log("El servidor esta levantado! http://localhost:2024");
});