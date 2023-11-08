import { voteCreateSchema } from "../schemas/votes.js";

export function validateCreateVote(req, res, next){
        //para validar el schema del body:
        voteCreateSchema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })
        .then(async function(vote){
            req.body = vote;
            next();
        })
       .catch(function(err){
        res.status(400).json(err);
       })
}