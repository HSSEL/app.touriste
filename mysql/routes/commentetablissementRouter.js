import express from 'express';

import { getCommentsEtablissement, getCommentEtablissement,createCommentEtablissement, updateCommentEtablissement, deleteCommentEtablissement} from '../controllers/commentetablissementController.js';

const commentetablissementRouter=express.Router()


commentetablissementRouter.get("/CommentsEtablissement",async (_req,res)=>{
    try {
        const CommentsEtablissement=await getCommentsEtablissement()
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
 
commentetablissementRouter.post('/CommentEtablissement', async (req, res) => {
    const { etablissement_id, id_touriste,Texte , Date, image } = req.body;
    try {
        const insertId = await createCommentEtablissement(etablissement_id, id_touriste,Texte , Date, image);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un monument
commentetablissementRouter.put('/CommentEtablissement/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte, image } = req.body;
    try {
        const updatedId = await updateCommentEtablissement(id, Texte, image);
        res.status(200).json({ id: updatedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
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



export {commentetablissementRouter}