import express from 'express';
import {
    getCommentsMonument,
    getCommentMonument,
    createCommentMonument,
    updateCommentMonument,
    deleteCommentMonument
} from '../controllers/commentmonumentController.js';

const commentmonumentRouter = express.Router();

// Route pour obtenir tous les commentaires des monuments
commentmonumentRouter.get('/commentsmonument', async (req, res) => {
    try {
        const comments = await getCommentsMonument();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'un monument par ID de monument
commentmonumentRouter.get('/commentsmonument/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentMonument(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour un monument
commentmonumentRouter.post('/commentsmonument', async (req, res) => {
    const { id_commentaire, monument_id, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentMonument(id_commentaire, monument_id, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un monument
commentmonumentRouter.put('/commentsmonument/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte, Date } = req.body;
    try {
        const updatedId = await updateCommentMonument(id, Texte, Date);
        res.status(200).json({ id: updatedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'un monument
commentmonumentRouter.delete('/commentsmonument/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedId = await deleteCommentMonument(id);
        res.status(200).json({ id: deletedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {commentmonumentRouter}