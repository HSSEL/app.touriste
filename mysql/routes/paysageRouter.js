import express from 'express';

import {
    getPaysages, getPaysageVille, getPaysage, createPaysage, updatePaysage, deletePaysage,
    getImage, updateImage, deleteImage
} from '../controllers/paysageController.js';

const paysageRouter = express.Router();

paysageRouter.get("/Paysages", async (_req, res) => {
    const paysages = await getPaysages();
    res.send(paysages);
});

paysageRouter.get("/Paysage/:id", async (req, res) => {
    const id = req.params.id;
    const paysage = await getPaysage(id);
    res.send(paysage);
});

paysageRouter.get("/PaysageVille/:id", async (req, res) => {
    const id = req.params.id;
    const paysageVille = await getPaysageVille(id);
    res.send(paysageVille);
});

paysageRouter.post("/Paysage", async (req, res) => {
    const { ville_id, nom, description, localisation, horarire_ouverture, image } = req.body;
    const paysage = await createPaysage(ville_id, nom, description, localisation, horarire_ouverture, image);
    res.status(201).send(paysage);
});

paysageRouter.put("/Paysage/:id", async (req, res) => {
    const id = req.params.id;
    const { ville_id, nom, description, localisation, horarire_ouverture, image } = req.body;
    const updated = await updatePaysage(id, ville_id, nom, description, localisation, horarire_ouverture, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

paysageRouter.delete("/Paysage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deletePaysage(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

paysageRouter.get("/PaysageImage/:id", async (req, res) => {
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
paysageRouter.put("/updateImage/:id", async (req, res) => {
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
paysageRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { paysageRouter };
