import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("goto_game_jam");
const GameCollection = db.collection('games');
const VotesCollection = db.collection('games_votes');


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

//6 GET
async function getGames(filter = {}) {
    await client.connect();

    const filterValido = filterQueryToMongo(filter);

    return GameCollection.find(filterValido).toArray();
}

//5:
async function getGameByID(id){
    await client.connect();

    const game = await GameCollection.findOne({_id: new ObjectId(id)});
    let gameName = game.name;
    const votes = await VotesCollection.find({ game_name: gameName }).toArray();

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
        "Promedio de puntuaciones": {
            Jugabilidad: jugabilidad/(votes.length),
            Arte: arte/(votes.length),
            Sonido: sonido/(votes.length),
            Tematica: tematica/(votes.length),
            }
        
    }

    console.log(game);
    
   return object
}

//3:
async function getGameByIDPoints(id){
    await client.connect();

    const game = await GameCollection.findOne({_id: new ObjectId(id)});
    let gameName = game.name;
    const votes = await VotesCollection.find({ game_name: gameName }).toArray();

     const object = {
         ...votes,     
     }


    console.log(game);
    
    return object
}


//6 POST
async function createGame(game){

    await client.connect();
    const newGame = { ...game};

    await GameCollection.insertOne(newGame);

    return game;
}

// 6 PATCH
async function updateGameByID(id, updateData){

    await client.connect();

    const result = await GameCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 1) {
        return GameCollection.findOne({_id: new ObjectId(id)});
    } 
}

// 6 PUT
async function replaceGameByID(id, replacedData) {
    await client.connect();

    const result = await GameCollection.replaceOne({ _id: new ObjectId(id) }, replacedData);

    if (result.matchedCount === 1) {
        return GameCollection.findOne({_id: new ObjectId(id)});
    }
}

//4:
const getGamesSortedByScore = async (edition, genre) => {
    try {
        await client.connect();
        const games = await GameCollection.find({ edition: edition }).toArray();
      
        const votesPromises = games.map(async (game) => {
            const votes = await VotesCollection.find({ game_name: game.name }).toArray();
            game.votes = votes; 
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

        let allGames;

        if(genre){
            allGames = gamesSorted.filter((game) => {
                return game.genre == genre;
            });
            if(!allGames.length >= 1){
                throw error;
            }
           console.log("dentro del gamesGenre: ", allGames);
        }else {
            allGames = gamesSorted;
        }

        client.close();
        console.log("mee stoy ejecutando: ", gamesSorted);

        return allGames;
      
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
  };

// 6 DELETE
async function deleteGameByID(id){
    try {
            await client.connect();
            const game = await GameCollection.findOne({ _id: new ObjectId(id) });
        console.log(game);
            // creamos una propiedad llamada deleted para indicar que el objeto esta eliminado 
            game.deleted = true; 
            const resultado = await GameCollection.deleteOne({_id: new ObjectId(game._id)});
            console.log(resultado);
            if (resultado.deletedCount === 1) {
                return resultado;
            }else{
                throw error;
            }
           
        }

        catch (error) {
        console.error('Error:', error);
        throw error; 
    }

}

export {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
    getGamesSortedByScore,
    getGameByIDPoints,
    deleteGameByID
}

export default {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
    getGamesSortedByScore,
    getGameByIDPoints,
    deleteGameByID
}
