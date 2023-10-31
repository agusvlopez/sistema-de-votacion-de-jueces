// Las funciones del controlador de los juegos


import * as GamesService from "../services/games.js";

// import ServiceProducts from "../services/products.js";

function getGames(req,res){

    GamesService.getGames(req.query)
    .then(function(games){
        //quiero devolver el 200 (todo ok) 
        //le digo que me envia en formato json el array 'productsFilter'
        res.status(200).json(games); 
    })
    .catch(function(err){
    res.status(500).json({msg: "No se encuentra el archivo"});
})

}

function getGameByID(req,res){
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const {idGame} = req.params;
    
    GamesService.getGameByID(idGame)
    .then(function(game){
        return res.status(200).json(game)
    })
    .catch(function(err){
        if(err?.code){
            res.status(err.code).json({msg: err.msg});
        }
        else {
            res.status(500).json({msg: "No se pudo obtener el archivo"});
        }

    })
}

async function createGame(req,res){
   return GamesService.createGame(req.body)
   .then(function(game){
    res.status(201).json(game)
   })
   .catch(function(err){
    res.status(500).json({ msg: err.msg });
   })
}

async function updateGameByID(req, res) {
    const { idGame } = req.params; // Obtiene el ID del juego de los parámetros de la URL
    const updateData = req.body; // Datos de actualización en el cuerpo de la solicitud

    GamesService.updateGameByID(idGame, updateData)
        .then(function (game) {
            res.status(200).json(game);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            } else {
                res.status(500).json({ msg: "No se pudo actualizar el juego" });
            }
        });
}

async function replaceGameByID(req, res) {
    const { idGame } = req.params; // Obtiene el ID del juego de los parámetros de la URL
    const replacedData = req.body; // Datos de actualización en el cuerpo de la solicitud

    GamesService.replaceGameByID(idGame, replacedData)
        .then(function (game) {
            res.status(200).json(game);
        })
        .catch(function (err) {
            if (err?.code) {
                res.status(err.code).json({ msg: err.msg });
            } else {
                res.status(500).json({ msg: "No se pudo actualizar el juego" });
            }
        });
}
// async function updateGameByID(req,res){
//     return GamesService.updateGameByID(req.body)
//     .then(function(game){
//      res.status(201).json(game)
//     })
//     .catch(function(err){
//      res.status(500).json({ msg: err.msg });
//     })
//  }

export {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID
}

export default{
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID
}