import express from 'express';
import GamesVotesController from '../controllers/gamesVotes.js';
import { validateCreateVote } from '../middleware/votes.js';

const route = express.Router();

//1:
//Un juez debe poder generar una votación a un juego.
route.post('/judges/:idJudge/votes/:idGame',[validateCreateVote], GamesVotesController.createVote);

//2:
//A partir del id de Juez debe poder obtener el nombre de los juegos y los puntos de cada categorías donde ese haya realizado alguna votación:
route.get('/judges/:idJudge/votes', GamesVotesController.getVotesByJudge);

export default route;