import express from 'express';

import {
    getSantes, getSanteVille, getSante, createSante, updateSante, deleteSante,
    getImage, updateImage, deleteImage
} from '../controllers/santeController.js';

const santeRouter = express.Router();

// Route pour récupérer toutes les entités de santé
santeRouter.get("/Santes", async (_req, res) => {
    const santes = await getSantes();
    res.send(santes);
});

// Route pour récupérer une entité de santé par ID
santeRouter.get("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const sante = await getSante(id);
    res.send(sante);
});

// Route pour récupérer les entités de santé d'une ville par ID de ville
santeRouter.get("/SanteVille/:id", async (req, res) => {
    const id = req.params.id;
    const santeVille = await getSanteVille(id);
    res.send(santeVille);
});

// Route pour créer une nouvelle entité de santé
santeRouter.post("/Sante", async (req, res) => {
    const { id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email } = req.body;
    const sante = await createSante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email);
    res.status(201).send(sante);
});

// Route pour mettre à jour une entité de santé par ID
santeRouter.put("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email } = req.body;
    const updated = await updateSante(id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

// Route pour supprimer une entité de santé par ID
santeRouter.delete("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteSante(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

// Route pour récupérer l'image d'une entité de santé par ID
santeRouter.get("/SanteImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Route pour mettre à jour l'image d'une entité de santé par ID
santeRouter.put("/updateImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

// Route pour supprimer l'image d'une entité de santé par ID
santeRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { santeRouter };
