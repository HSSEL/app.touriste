import express from 'express';
import {
    getCommentsTransport,
    getCommentTransport,
    createCommentTransport,
    updateCommentTransport,
    deleteCommentTransport
} from '../controllers/commenttransportController.js';

const commenttransportRouter = express.Router();

// Route pour obtenir tous les commentaires des transports
commenttransportRouter.get('/commentstransport', async (req, res) => {
    try {
        const comments = await getCommentsTransport();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'un transport par ID de transport
commenttransportRouter.get('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentTransport(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour un transport
commenttransportRouter.post('/commentstransport', async (req, res) => {
    const { id_commentaire, transport_id, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentTransport(id_commentaire, transport_id, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un transport
commenttransportRouter.put('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentTransport(id, Texte);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'un transport
commenttransportRouter.delete('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await deleteCommentTransport(id);
        if (deletedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export { commenttransportRouter }