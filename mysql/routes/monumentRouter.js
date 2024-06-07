import express from 'express';

import {
    getMonuments, getMonumentVille, getMonument, createMonument, updateMonument, deleteMonument,
    getImage, updateImage, deleteImage
} from '../controllers/monumentController.js';

const monumentRouter = express.Router();

monumentRouter.get("/Monuments", async (_req, res) => {
    const monuments = await getMonuments();
    res.send(monuments);
});

monumentRouter.get("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const monument = await getMonument(id);
    res.send(monument);
});

monumentRouter.get("/monumentVille/:id", async (req, res) => {
    const id = req.params.id;
    const monumentVille = await getMonumentVille(id);
    res.send(monumentVille);
});

monumentRouter.post("/Monument", async (req, res) => {
    const { id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image } = req.body;
    const monument = await createMonument(id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image);
    res.status(201).send(monument);
});

monumentRouter.put("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image } = req.body;
    const updated = await updateMonument(id, id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

monumentRouter.delete("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteMonument(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

monumentRouter.get("/monumentImage/:id", async (req, res) => {
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
monumentRouter.put("/updateImage/:id", async (req, res) => {
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
monumentRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { monumentRouter };
