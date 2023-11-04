import express from 'express';
import GamesVotesController from '../controllers/gamesVotes.js';


const route = express.Router();

//FALTA UBICAR LOS JUECES EN EL BODY. COMO LO HAGO???????
route.route('/games/:idGame/votes')
.get(GamesVotesController.getVotesByGame)
// .post(GamesVotesController.createVote)

route.get('/judges', GamesVotesController.getJudges)
route.get('/judges/:idJudge/votes', GamesVotesController.getVotesByJudge);
route.post('/judges/:idJudge/votes/:idGame', GamesVotesController.createVote);

// route.get('/judges/:idJudge/votes/:idGame', GamesVotesController.getVotesByJudge);
// route.get('/:idProduct/reviews', function(req,res){

//     res.json(req.params);
// });

export default route;