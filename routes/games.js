//se va a encargar de hacer el merge entre la url o uri y el controlador
// voy a decirle a node que me permita crear rutas:

import express from 'express';
import GamesController from '../controllers/games.js'
// import ProductsReviewRoute from './productsReviews.js';

//aca creamos una ruta
const route = express.Router();

//aca decidimos que queremos hacer:
// route.get('/games', GamesController.getGamesSortedByScore);
route.post('/games', GamesController.createGame);
route.get('/games/:idGame', GamesController.getGameByID);
route.patch('/games/:idGame', GamesController.updateGameByID);
route.put('/games/:idGame', GamesController.replaceGameByID);

route.get('/games/edition/:edition', GamesController.getGamesSortedByScore);
// route.use('/games/', ProductsReviewRoute);
//exportamos la ruta
export default route;