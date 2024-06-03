import express from 'express';
import {
    getCommentsPublication,
    getCommentPublication,
    createCommentPublication,
    updateCommentPublication,
    deleteCommentPublication
} from '../controllers/commentpublicationController.js';

const commentpublicationRouter = express.Router();

// Route pour obtenir tous les commentaires des publications
commentpublicationRouter.get('/commentspublication', async (req, res) => {
    try {
        const comments = await getCommentsPublication();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'une publication par ID de publication
commentpublicationRouter.get('/commentspublication/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentPublication(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour une publication
commentpublicationRouter.post('/commentspublication', async (req, res) => {
    const { id_commentaire, id_publication, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentPublication(id_commentaire, id_publication, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'une publication
commentpublicationRouter.put('/commentspublication/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentPublication(id, Texte);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'une publication
commentpublicationRouter.delete('/commentspublication/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await deleteCommentPublication(id);
        if (deletedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json ({error: error.message});
            }
            } catch (error) {
                res.status(500).json({ error: error.message });
                }
                });

export {commentpublicationRouter}
