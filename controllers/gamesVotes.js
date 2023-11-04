import GameVotesService from '../services/gameVotes.js';

function getGames(req,res){

    GameVotesService.getGames(req.query)
    .then(function(games){
        //quiero devolver el 200 (todo ok) 
        //le digo que me envia en formato json el array 'productsFilter'
        res.status(200).json(games); 
    })
    .catch(function(err){
    res.status(500).json({msg: "No se encuentra el archivo"});
})

}

function getJudges(req,res){
    const {idJudge} = req.params;

    GameVotesService.getJudges(idJudge)
    .then(function(judges){
        res.json(judges)
    })
    .catch(function (err) {
        res.status(500).json({msg: err.msg})
    })
}

function getJudgeByID(req,res){
    //obtengo el valor a traves de los params, puede ser de las dos siguientes formas:
    //const idProduct = req.params.idProduct;
    const {idJudge} = req.params;
    
    GameVotesService.getJudgeByID(idJudge)
    .then(function(judge){
        return res.status(200).json(judge)
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

function getVotesByJudge(req,res){
   
    const {idJudge} = req.params;

    GameVotesService.findVotesByJudge(idJudge)
    .then(function(votes){
        res.json(votes)
    })
    .catch(function (err) {
        res.status(500).json({msg: err.msg})
    })
}

function getVotesByGame(req,res){
   
    const {idGame} = req.params;

    GameVotesService.findVotesByGame(idGame)
    .then(function(votes){
        res.json(votes)
    })
    .catch(function (err) {
        res.status(500).json({msg: err.msg})
    })
}

function createVote(req,res){
    
    const {idGame} = req.params;
    const {idJudge} = req.params;

    GameVotesService.createVote(idGame, idJudge, req.body)
    .then(function(votes){
        
        res.json(votes)
    })
    .catch(function (err) {
        res.status(500).json({msg: "El juez ya ha votado por este juego"})
    })

}


// function getJudges(req,res){
//     const {idJudge} = req.params;

//     GameVotesService.findJudges(idJudge)
//     .then(function(judges){
//         res.json(judges)
//     })
//     .catch(function (err) {
//         res.status(500).json({msg: err.msg})
//     })
// }

export default {
    getVotesByJudge,
    getVotesByGame,
    createVote,
    getJudges,
    getJudgeByID,
    getGames
}