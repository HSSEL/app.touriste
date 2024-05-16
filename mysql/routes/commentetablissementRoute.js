import express from 'express';

import { getCommentsEtablissement, getCommentEtablissement,createCommentEtablissement} from '../controllers/commentetablissementController';

const commentetablissementRouter=express.Router()


commentetablissementRouter.get("/CommentsEtablissement",async (req,res)=>{
    const CommentsEtablissement=await getCommentsEtablissement()
    res.send(CommentsEtablissement)
})

commentetablissementRouter.get("/CommentEtablissement:id",async (req,res)=>{
    const id= req.params.id
    const CommentEtablissement=await getCommentEtablissement(id)
    res.send(CommentEtablissement)
})

commentetablissementRouter.post("/CreateCommentEtablissement:",async (req,res)=>{
    const {id_commentaire, etablissement_id, id_touriste, Texte, Date} =req.body
    const CreateCommentEtablissement=await createCommentEtablissement(id_commentaire, etablissement_id, id_touriste, Texte, Date)
    res.status(201).send(CreateCommentEtablissement)
})

export {commentetablissementRouter}