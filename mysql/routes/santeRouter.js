import express from 'express';

import {
    getSantes, getSanteVille, getSante, createSante, updateSante, deleteSante,
    getImage, updateImage, deleteImage
} from '../controllers/santeController.js';

const santeRouter = express.Router();

santeRouter.get("/Santes", async (_req, res) => {
    const santes = await getSantes();
    res.send(santes);
});

santeRouter.get("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const sante = await getSante(id);
    res.send(sante);
});

santeRouter.get("/SanteVille/:id", async (req, res) => {
    const id = req.params.id;
    const santeVille = await getSanteVille(id);
    res.send(santeVille);
});

santeRouter.post("/Sante", async (req, res) => {
    const { id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email } = req.body;
    const sante = await createSante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email);
    res.status(201).send(sante);
});

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

santeRouter.delete("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteSante(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

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

// Route to update an image
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

// Route to delete an image
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
