//Nos brinda toda la info que tiene que ver con la carga o datos de un juego
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("goto_game_jam");
const GameVotesCollection = db.collection('games_votes');
const JudgesCollection = db.collection('judges');
const GameCollection = db.collection('games');

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

async function getJudges(filter = {}) {
    await client.connect();

    const filterValido = filterQueryToMongo(filter);

    return JudgesCollection.find(filterValido).toArray();
}

async function getJudgeByID(id){
    await client.connect();
    const idJ = JudgesCollection.findOne({_id: new ObjectId(id)});
    console.log(idJ);
    return idJ;
}

async function findVotesByJudge(idJudge){
    await client.connect();

    return GameVotesCollection.find({judge_id: new ObjectId(idJudge)}).toArray();
}

async function findVotesByGame(idGame){
    await client.connect();

    return GameVotesCollection.find({game_id: new ObjectId(idGame)}).toArray();
}


async function createVote(idGame, idJudge, vote) { 
    await client.connect();
    try {
        const game = await GameCollection.findOne({ _id: new ObjectId(idGame) }); // Busca el juego por su ID
        const judge = await JudgesCollection.findOne({ _id: new ObjectId(idJudge) }); // Busca el juez por su ID
        
        if (!game || !judge) {
            throw error;
        }
        
        const newVote = {
            ...vote,
            game_name: game.name,
            judge_name: judge.name,
        }

        const votesByJudge = await findVotesByJudge(idJudge);
        console.log("votes:", votesByJudge);

        const voteExists = votesByJudge.some((document) => {
            const gameID = document.game_id.toString();
            return gameID === idGame;
        });

        if (voteExists) {
            console.log("Hola: ", idGame);
            throw new Error("El juez ya ha votado por este juego");
        } else {
            console.log("llegué al else");
            await GameVotesCollection.insertOne(newVote);
        }

        return newVote;
    } catch (error) {
        throw error; // Relanza el error para que pueda manejarse en el controlador
    }
}

export default {
    findVotesByJudge,
    findVotesByGame,
    createVote,
    getJudges,
    getJudgeByID,
    getGames
}