import express from 'express';
import {
    getCommentsPaysage,
    getCommentPaysage,
    createCommentPaysage,
    updateCommentPaysage,
    deleteCommentPaysage
} from '../controllers/commentpaysageController.js';

const commentpaysageRouter = express.Router();

// Route pour obtenir tous les commentaires des paysages
commentpaysageRouter.get('/commentspaysage', async (req, res) => {
    try {
        const comments = await getCommentsPaysage();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'un paysage par ID de paysage
commentpaysageRouter.get('/commentspaysage/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentPaysage(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour un paysage
commentpaysageRouter.post('/commentspaysage', async (req, res) => {
    const { id_touriste,Texte , Date, image, paysage_id  } = req.body;
    try {
        const insertId = await createCommentPaysage(id_touriste,Texte , Date, image, paysage_id );
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un paysage
commentpaysageRouter.put('/commentspaysage/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    const { image } = req.body;
    try {
        const updatedRows = await updateCommentPaysage(id, Texte,image);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'un paysage
commentpaysageRouter.delete('/commentspaysage/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await deleteCommentPaysage(id);
        if (deletedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json ({error: error.message});
            }
            } catch (error) {
                res.status(500).json({ error: error.message });
                }
                });
export {commentpaysageRouter}