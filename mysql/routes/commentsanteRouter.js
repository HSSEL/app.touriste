import express from 'express'

import { getCommentsSante, getCommentSante, createCommentSante, updateCommentSante, deleteCommentSante} from '../controllers/commentsanteController'

const commentsanteRouter=express.Router()


commentsanteRouter.get("/CommentsSantes",async (_req,res)=>{
    try {
        const CommentsSantes=await getCommentsSante()
        res.status(200).send(CommentsSantes)
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal server error');
    }
})

commentsanteRouter.get("/CommentSante:id",async (req,res)=>{
    const id= req.params.id
    const CommentSante=await getCommentSante(id)
    res.send(CommentSante)
})

commentsanteRouter.post("/CommentSante/:id", async (req, res) => {
    const id_commentaire = req.params.id;
    

    if (!Texte || !sante_id || !id_touriste || !Date) {
        return res.status(400).send('All fields are required');
    }

    try {
        const updated = await updateCommentSante(id_commentaire, sante_id, id_touriste, Texte, Date);
        if (updated) {
            res.status(200).send('Comment updated successfully');
        } else {
            res.status(404).send('Comment not found');        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).send('Internal server error');
    }
});

commentsanteRouter.delete("/CommentSante/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentSante(id);
    if (deleted) {
        res.send('Comment deleted successfully');
    } else {
        res.send('Comment not found');
    }
});

commentsanteRouter.post("/CreateCommentSante:",async (req,res)=>{
    const {sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email} =req.body
    const CreateCommentSante=await createCommentSante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email)
    res.status(201).send(CreateCommentSante)
})


export {commentsanteRouter}