import express from 'express';
import GamesRoute from './routes/games.js';
import GamesVotesRoute from './routes/gamesVotes.js';

const app = express();


app.use(express.json()); //interpreta el body cuando viene un JSON.

app.use(GamesRoute);
app.use(GamesVotesRoute);


//Escuchamos un puerto
app.listen(2024, function () {
    console.log("El servidor esta levantado! http://localhost:2024");
});