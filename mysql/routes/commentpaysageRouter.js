import express from 'express';
import {
    getCommentsPaysage,
    getCommentPaysage,
    createCommentPaysage,
    updateCommentPaysage,
    deleteCommentPaysage
} from '../controllers/commentpaysageController';

const router = express.Router();

// Route pour obtenir tous les commentaires des paysages
router.get('/commentspaysage', async (req, res) => {
    try {
        const comments = await getCommentsPaysage();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'un paysage par ID de paysage
router.get('/commentspaysage/:id', async (req, res) => {
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
router.post('/commentspaysage', async (req, res) => {
    const { id_commentaire, paysage_id, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentPaysage(id_commentaire, paysage_id, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un paysage
router.put('/commentspaysage/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentPaysage(id, Texte);
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
router.delete('/commentspaysage/:id', async (req, res) => {
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