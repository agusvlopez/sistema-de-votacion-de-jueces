import { gameCreateSchema, gameUpdateSchema } from "../schemas/games.js";

export function validateCreateGame(req, res, next){
        //para validar el schema del body:
        gameCreateSchema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })
        .then(async function(game){
            req.body = game;
            next();
        })
       .catch(function(err){
        res.status(400).json(err);
       })
}

export function validateUpdateGame(req, res, next){
    //para validar el schema del body:
    gameUpdateSchema.validate(req.body, {

    })
    .then(async function(game){
        req.body = game;
        next();
    })
   .catch(function(err){
    res.status(400).json(err);
   })
}