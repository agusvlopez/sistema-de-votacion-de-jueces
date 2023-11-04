import express from 'express';
import JudgesController from '../controllers/judges.js';

const route = express.Router();

//FALTA UBICAR LOS JUECES EN EL BODY. COMO LO HAGO???????
route.get('/judges', JudgesController.getJudges)
route.get('/judges/:idJudge', JudgesController.getJudgeByID);
route.post('/judges/:idJudge/votes', JudgesController.createVote);
route.get('/judges/:idJudge/votes/', JudgesController.getVotes);
//.post('/games', GamesController.createGame);

// .post(GamesVotesController.createVote)

// route.get('/:idProduct/reviews', function(req,res){

//     res.json(req.params);
// });

export default route;