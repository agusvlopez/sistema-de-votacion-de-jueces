//Nos brinda toda la info que tiene que ver con la carga o datos de un juego
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("goto_game_jam");
const JudgesCollection = db.collection('judges');

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

async function getJudges(filter = {}) {
    await client.connect();

    const filterValido = filterQueryToMongo(filter);

    return JudgesCollection.find(filterValido).toArray();
}

async function getJudgeByID(id){
    await client.connect();
    return JudgesCollection.findOne({_id: new ObjectId(id)});
}

async function createVote(idJudge, vote){
    await client.connect();

    const newVote = {
        ...vote,
        judge_id: new ObjectId(idJudge),
        
    }

    await JudgesCollection.insertOne(newVote);

    return newVote;
}

async function findVotes(idJudge){
    await client.connect();

    return JudgesCollection.find({_id: new ObjectId(idJudge)}).toArray();
}

export default {
    getJudges,
    getJudgeByID,
    createVote,
    findVotes
}