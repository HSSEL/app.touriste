import express from 'express'

import { getCommentsSante, getCommentSante, createCommentSante} from '../controllers/commentsanteController'

const commentsanteRouter=express.Router()


commentsanteRouter.get("/CommentsSantes",async (req,res)=>{
    const CommentsSantes=await getCommentsSante()
    res.send(CommentsSantes)
})

commentsanteRouter.get("/CommentSante:id",async (req,res)=>{
    const id= req.params.id
    const CommentSante=await getCommentSante(id)
    res.send(CommentSante)
})


commentsanteRouter.post("/CreateCommentSante:",async (req,res)=>{
    const {sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email} =req.body
    const CreateCommentSante=await createCommentSante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email)
    res.status(201).send(CreateCommentSante)
})

export {commentsanteRouter}