import express from 'express';
import GamesController from '../controllers/games.js'
import { validateCreateGame, validateUpdateGame } from '../middleware/games.js';

const route = express.Router();

//3.
//A partir del id del juego, se debe poder visualizar los nombres de los jueces y los puntos de cada categoría que puso ese juez.
route.get('/:idGame/points', GamesController.getGameByIDPoints);

//4: - A partir de la edicion, se debe poder obtener el listado de juegos ordenados de mayor a menor puntaje (el puntaje es calculado a partir de la suma de todos los puntos obtenidos de todas las categorías).
//    - Se debe poder filtrar por genero.
route.get('/games/edition/:edition', GamesController.getGamesSortedByScore);

//5:
//A partir de un id de juego, calcule y devuelva el promedio de puntuaciones de ese juego específico en cada una de las categorías junto con todos los datos del juego.
route.get('/games/:idGame', GamesController.getGameByID);

//6:
//CRUD de los juegos
route.get('/games', GamesController.getGames);
route.post('/games',[validateCreateGame], GamesController.createGame);
route.patch('/games/:idGame', [validateUpdateGame], GamesController.updateGameByID);
route.put('/games/:idGame',[validateCreateGame], GamesController.replaceGameByID);
route.delete('/games/:idGame', GamesController.deleteGameByID);


export default route;