//Nos brinda toda la info que tiene que ver con la carga o datos de un producto
import { MongoClient, ObjectId } from "mongodb";

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
    return GameCollection.findOne({_id: new ObjectId(id)});
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

export {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
 
}

export default {
    getGames,
    getGameByID,
    createGame,
    updateGameByID,
    replaceGameByID,
  
}
