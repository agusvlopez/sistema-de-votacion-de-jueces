import express from 'express';
import GamesVotesController from '../controllers/gamesVotes.js';
import { validateCreateVote } from '../middleware/votes.js';

const route = express.Router();
//Este:
route.route('/games/:idGame/votes')
.get(GamesVotesController.getVotesByGame)
// .post(GamesVotesController.createVote)

route.get('/judges', GamesVotesController.getJudges)
route.get('/judges/:idJudge/votes', GamesVotesController.getVotesByJudge);
route.post('/judges/:idJudge/votes/:idGame',[validateCreateVote], GamesVotesController.createVote);

// route.get('/judges/:idJudge/votes/:idGame', GamesVotesController.getVotesByJudge);
// route.get('/:idProduct/reviews', function(req,res){

//     res.json(req.params);
// });

export default route;