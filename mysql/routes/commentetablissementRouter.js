import express from 'express';

import { getCommentsEtablissement, getCommentEtablissement,createCommentEtablissement, updateCommentEtablissement, deleteCommentEtablissement} from '../controllers/commentetablissementController.js';

const commentetablissementRouter=express.Router()


commentetablissementRouter.get("/CommentsEtablissement",async (_req,res)=>{
    try {
        const CommentsEtablissement=await getCommentsEtablissement()
        console.log('Fetched etab data:', CommentsEtablissement);
        res.status(200).send(CommentsEtablissement)
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal server error');
    }
    
})

commentetablissementRouter.get("/CommentEtablissement:id",async (req,res)=>{
    const id= req.params.id
    const CommentEtablissement=await getCommentEtablissement(id)
    res.send(CommentEtablissement)
})
 
commentetablissementRouter.post("/CommentEtablissement/:id", async (req, res) => {
    const id_commentaire = req.params.id;
    

    if (!Texte || !etablissement_id || !id_touriste || !Date) {
        return res.status(400).send('All fields are required');
    }

    try {
        const updated = await updateCommentEtablissement(id_commentaire, etablissement_id, id_touriste, Texte, Date);
        if (updated) {
            res.status(200).send('Comment updated successfully');
        } else {
            res.status(404).send('Comment not found');        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).send('Internal server error');
    }
});

commentetablissementRouter.delete("/CommentEtablissement/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentEtablissement(id);
    if (deleted) {
        res.send('Comment deleted successfully');
    } else {
        res.send('Comment not found');
    }
});

commentetablissementRouter.post("/CreateCommentEtablissement:",async (req,res)=>{
    const {id_commentaire, etablissement_id, id_touriste, Texte, Date} =req.body
    const CreateCommentEtablissement=await createCommentEtablissement(id_commentaire, etablissement_id, id_touriste, Texte, Date)
    res.status(201).send(CreateCommentEtablissement)
})

export {commentetablissementRouter}