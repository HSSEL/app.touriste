import express from 'express';
import {
    getCommentsVille,
    getCommentVille,
    createCommentVille,
    updateCommentVille,
    deleteCommentVille
} from '../controllers/commentvilleController.js';

const router = express.Router();

// Route pour obtenir tous les commentaires des villes
router.get('/commentsville', async (req, res) => {
    try {
        const comments = await getCommentsVille();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'une ville par ID de ville
router.get('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentVille(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour une ville
router.post('/commentsville', async (req, res) => {
    const { id_commentaire, id_ville, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentVille(id_commentaire, id_ville, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'une ville
router.put('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentVille(id, Texte);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'une ville
router.delete('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedId = await deleteCommentVille(id);
        res.status(200).json({ id: deletedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export { commentvilleRouter }