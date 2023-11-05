//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { Int32, MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("goto_game_jam");
const GameCollection = db.collection('games');
const VotesCollection = db.collection('games_votes');

//en el momento que hacemos algo con la coleccion(en este caso utilizando la constante ProductCollection), recién ahi se conecta a la bbdd

function filterQueryToMongo(filter){
    const filterMongo = {};
    
    for(const filed in filter){
        if(isNaN(filter[filed])){
            filterMongo[filed] = filter[filed];
        }
        else {
            const [field, op] = filed.split('_');

            if(!op){
                filterMongo[filed] = parseInt(filter[filed]);
            }
            else {
                if(op === 'min'){
                    filterMongo[field] = {
                        $gte: parseInt(filter[filed])
                    }
                }
                else if(op === 'max'){
                    filterMongo[field] = {
                        $lte: parseInt(filter[filed])
                    }
                }
            }
          
        }
        
    }    

    return filterMongo;
   
}

async function getGames(filter = {}) {
    await client.connect();

    const filterValido = filterQueryToMongo(filter);

    return GameCollection.find(filterValido).toArray();
}


async function getGameByID(id){
    await client.connect();

    const game = await GameCollection.findOne({_id: new ObjectId(id)});
  
    const votes = await VotesCollection.find({ game_id: new ObjectId(id) }).toArray();

    let jugabilidad = 0;
    let arte = 0;
    let sonido = 0;
    let tematica = 0;  
   
    votes.forEach(g => {
        jugabilidad += g.Jugabilidad;
        arte += g.Arte;
        sonido += g.Sonido;
        tematica += g.Tematica;
          
    }) 
    const object = {
            ...game,
            jugabilidad: jugabilidad/(votes.length),
            arte: arte/(votes.length),
            sonido: sonido/(votes.length),
            tematica: tematica/(votes.length),
    }

    console.log(game);
    
   return object
}

async function getGameByEdition(edition){
    await client.connect();
    return GameCollection.find({edition: Int32(edition)});
}

async function createGame(game){

    await client.connect();
    const newGame = { ...game};

    await GameCollection.insertOne(newGame);

    return game;
}

async function updateGameByID(id, updateData){

    await client.connect();

    const result = await GameCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 1) {
        return { success: true, message: "Juego actualizado correctamente" };
    } else {
        return { success: false, message: "No se encontró el juego con el ID proporcionado" };
    }
}

async function replaceGameByID(id, replacedData) {
    await client.connect();

    const result = await GameCollection.replaceOne({ _id: new ObjectId(id) }, replacedData);

    if (result.matchedCount === 1) {
        return { success: true, message: "Juego actualizado correctamente" };
    } else {
        return { success: false, message: "No se encontró el juego con el ID proporcionado" };
    }
}


// const getGamesSortedByScore = async (edition) => {

//   await client.connect();
//     const games = await GameCollection.find({edition: edition}).toArray();
//     // console.log(games);

//     const votesGames = games.forEach(async (game) => {
//         const votes = await VotesCollection.find({game_id: game._id }).toArray(); 
//         // console.log(votes);
//         return votes;
//     });
        
//     const scores = votesGames.forEach(async (vote) => {
//         vote.score = await vote.Jugabilidad + vote.Arte + vote.Sonido + vote.Tematica; 
//         console.log(scores);
//     });

   
//     const gamesSorted = scores.sort((a, b) => b.score - a.score);
  

//     client.close();

//     return gamesSorted;
   
    
// };
const getGamesSortedByScore = async (edition) => {
    try {
      await client.connect();
      const games = await GameCollection.find({ edition: edition }).toArray();
      
      const votesPromises = games.map(async (game) => {
        const votes = await VotesCollection.find({ game_id: game._id }).toArray();
        game.votes = votes; // Asociar los votos al juego
        return game;
      });
  
      const gamesWithVotes = await Promise.all(votesPromises);
      
      gamesWithVotes.forEach((game) => {
        game.score = game.votes.reduce((acc, vote) => acc + vote.Jugabilidad + vote.Arte + vote.Sonido + vote.Tematica, 0);
      });

      // Eliminar el campo 'votes' de cada juego
        gamesWithVotes.forEach((game) => {
            delete game.votes;
        });

      const gamesSorted = gamesWithVotes.sort((a, b) => b.score - a.score);
  
      client.close();
        console.log("mee stoy ejecutando: ", gamesSorted);
      return gamesSorted;
      
    } catch (error) {
      console.error('Error:', error);
      throw error; // Puedes lanzar el error para que sea manejado en un catch posterior
    }
  };

  async function getGamesByGenre(edition, genre){
    try {
        const sortedGames = await getGamesSortedByScore(edition)

        const gamesGenres = sortedGames.filter((game) => {
            return game.genre == genre;
        });
        
        return gamesGenres;

    } catch (error) {
    console.error('Error:', error);
    throw error; // Puedes lanzar el error para que sea manejado en un catch posterior
  }
  }

export {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
    getGameByEdition,
    getGamesSortedByScore,
    getGamesByGenre
}

export default {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
    getGameByEdition,
    getGamesSortedByScore,
    getGamesByGenre
}
