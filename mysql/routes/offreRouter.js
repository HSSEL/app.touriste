import express from 'express';
import { getOffres, getOffre } from '../controllers/offreController.js';

const offreRouter = express.Router();

// Route pour obtenir toutes les offres
offreRouter.get('/offres', async (req, res) => {
    try {
        const offres = await getOffres();
        res.status(200).json(offres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir une offre par ID
offreRouter.get('/offres/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const offre = await getOffre(id);
        if (offre) {
            res.status(200).json(offre);
        } else {
            res.status(404).json({ message: 'Offre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {offreRouter}