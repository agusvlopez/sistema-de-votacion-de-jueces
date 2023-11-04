import mongoose from 'mongoose';

// Define el esquema del modelo de Votes
const votesSchema = new mongoose.Schema({
  judge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge', // Referencia al modelo Judge (si existe)
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game', // Referencia al modelo Game (si existe)
  },
  gameplay: Number,
  art: Number,
  sound: Number,
  theme: Number,
});

// Crea el modelo de Votes
const Votes = mongoose.model('Votes', votesSchema);


export {
   Votes
}

export default {
    Votes
}
