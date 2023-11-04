import JudgesService from '../services/judges.js';

function getJudges(req,res){
    const {idJudge} = req.params;

    JudgesService.getJudges(idJudge)
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
    
    JudgesService.getJudgeByID(idJudge)
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

function createVote(req,res){
    const {idJudge} = req.params;

    JudgesService.createVote(idJudge, req.body)
    .then(function(votes){
        res.json(votes)
    })
    .catch(function (err) {
        res.status(500).json({msg: err.msg})
    })
}
function getVotes(req,res){
    const {idJudge} = req.params;

    JudgesService.findVotes(idJudge)
    .then(function(votes){
        res.json(votes)
    })
    .catch(function (err) {
        res.status(500).json({msg: err.msg})
    })
}
export default {
    getJudges,
    getJudgeByID,
    createVote,
    getVotes
}